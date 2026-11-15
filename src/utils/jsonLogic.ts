export interface JsonProcessResult {
  isValid: boolean;
  formatted?: string;
  minified?: string;
  errorMessage?: string;
  errorLine?: number | null;
  errorChar?: number | null;
}

export function processJSON(input: string): JsonProcessResult {
  if (!input || input.trim() === '') {
    return {
      isValid: false,
      errorMessage: 'Input is empty.',
      errorLine: null,
      errorChar: null
    };
  }

  try {
    const parsed = JSON.parse(input);
    return {
      isValid: true,
      formatted: JSON.stringify(parsed, null, 2),
      minified: JSON.stringify(parsed)
    };
  } catch (err: any) {
    const message = err.message || 'Invalid JSON';
    
    // Attempt to extract position/line information from V8 engine errors
    let errorLine: number | null = null;
    let errorChar: number | null = null;
    
    // Format 1: "... at position 104"
    const posMatch = message.match(/position (\d+)/);
    if (posMatch && posMatch[1]) {
      const position = parseInt(posMatch[1], 10);
      const textUpToError = input.substring(0, position);
      const lines = textUpToError.split('\n');
      
      errorLine = lines.length;
      errorChar = lines[lines.length - 1].length + 1; // 1-indexed
    } else {
      // Format 2: "... at line 4 column 2 of the JSON data"
      const lineMatch = message.match(/line (\d+) column (\d+)/);
      if (lineMatch) {
          errorLine = parseInt(lineMatch[1], 10);
          errorChar = parseInt(lineMatch[2], 10);
      }
    }

    return {
      isValid: false,
      errorMessage: message,
      errorLine,
      errorChar
    };
  }
}
