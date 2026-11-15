const fs = require('fs');
const path = require('path');

const files = [
  'HomeLoanEmi.tsx',
  'PersonalLoanEmi.tsx',
  'BikeLoanEmi.tsx',
  'EducationLoanEmi.tsx'
];

for (const file of files) {
  const compPath = path.join('src', 'components', 'tools', file);
  if (!fs.existsSync(compPath)) continue;

  let content = fs.readFileSync(compPath, 'utf8');
  
  // 1. Add imports
  if (!content.includes('import { useSession }')) {
    content = content.replace(
      "import { Share2, Copy, Check, Download, AlertCircle } from 'lucide-react';",
      "import { Share2, Copy, Check, Download, AlertCircle, Save, Flame } from 'lucide-react';\nimport { useSession } from 'next-auth/react';\nimport { signIn } from 'next-auth/react';"
    );
  }

  // 2. Add state hooks for stats and saving
  if (!content.includes('const { data: session } = useSession();')) {
    const hookInjection = `
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [usageCount, setUsageCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/stats?toolId=' + '${file.replace('.tsx', '').replace(/([A-Z])/g, '-$1').toLowerCase().slice(1)}')
      .then(r => r.json())
      .then(d => { if (d.success) setUsageCount(d.count); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    if (!session) {
      signIn();
      return;
    }
    setIsSaving(true);
    try {
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: '${file.replace('.tsx', '').replace(/([A-Z])/g, '-$1').toLowerCase().slice(1)}',
          inputData: { principal: principalStr, rate: rateStr, tenureYears: tenureYearsStr }
        })
      });
      alert('Calculation saved to your profile!');
    } catch (e) {
      alert('Failed to save.');
    }
    setIsSaving(false);
  };
`;
    // Inject right after const { currency } = useStore();
    content = content.replace(
      "const { currency } = useStore();",
      "const { currency } = useStore();" + hookInjection
    );
  }

  // 3. Add Save button to actions strip (next to Share)
  if (!content.includes('handleSave')) {
    const saveBtn = `
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="p-3 bg-surface-2 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors border border-glass-border flex items-center justify-center flex-1 sm:flex-none tooltip-trigger relative group"
                >
                  <Save size={20} className={isSaving ? "animate-pulse" : ""} />
                  <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg text-sm font-medium border border-glass-border shadow-xl whitespace-nowrap">
                    {session ? 'Save to Profile' : 'Login to Save'}
                  </span>
                </button>`;
    
    // Inject right before the Share button
    content = content.replace(
      /<button\s+onClick=\{handleShare\}/g,
      saveBtn + '\n                <button onClick={handleShare}'
    );
  }

  // 4. Add "Used X times" badge
  if (!content.includes('usageCount !== null')) {
    const badge = `
          {usageCount !== null && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 text-orange-500 rounded-full border border-orange-500/20 w-fit mb-4 mt-2 font-medium text-sm animate-fade-in-up">
              <Flame size={16} className="animate-pulse" />
              Used {usageCount.toLocaleString()} times
            </div>
          )}`;
    
    // Inject right before the grid container in the return statement
    content = content.replace(
      /<div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">/g,
      badge + '\n        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">'
    );
  }

  fs.writeFileSync(compPath, content);
  console.log('Modified', file);
}
