import fs from 'fs';
import path from 'path';

/**
 * Anchor Contract-First Engine
 */
export class AnchorEngine {
  generateServerRoutes(endpoints) {
    let code = `import express from 'express';\nconst router = express.Router();\n\n`;

    endpoints.forEach(ep => {
      const method = (ep.method || 'GET').toLowerCase();
      const routePath = ep.path || '/';

      code += `// ${ep.summary || 'API Endpoint'}\n`;
      code += `router.${method}('${routePath}', async (req, res) => {\n`;
      code += `  try {\n`;
      if (ep.requiredFields) {
        code += `    // Validate payload\n`;
        const reqFields = ep.requiredFields.map(f => `'${f}'`).join(', ');
        code += `    const missing = [${reqFields}].filter(f => !req.body[f]);\n`;
        code += `    if (missing.length > 0) {\n`;
        code += `      return res.status(400).json({ error: \`Missing required fields: \${missing.join(', ')}\` });\n`;
        code += `    }\n`;
      }
      code += `    return res.status(200).json({ status: 'ok', message: 'Endpoint stub executed successfully' });\n`;
      code += `  } catch (err) {\n`;
      code += `    return res.status(500).json({ error: err.message });\n`;
      code += `  }\n`;
      code += `});\n\n`;
    });

    code += `export default router;\n`;
    return code;
  }

  generateClientSdk(endpoints, baseUrl = 'http://localhost:3000') {
    let code = `export class ApiClient {\n`;
    code += `  constructor(baseUrl = '${baseUrl}') {\n`;
    code += `    this.baseUrl = baseUrl;\n`;
    code += `  }\n\n`;

    endpoints.forEach(ep => {
      const methodName = ep.name || `${(ep.method || 'get').toLowerCase()}${ep.path.replace(/[^a-zA-Z0-9]/g, '')}`;
      const method = (ep.method || 'GET').toUpperCase();

      code += `  async ${methodName}(payload = {}) {\n`;
      code += `    const response = await fetch(\`\${this.baseUrl}${ep.path}\`, {\n`;
      code += `      method: '${method}',\n`;
      code += `      headers: { 'Content-Type': 'application/json' },\n`;
      if (method !== 'GET') {
        code += `      body: JSON.stringify(payload)\n`;
      }
      code += `    });\n`;
      code += `    return response.json();\n`;
      code += `  }\n\n`;
    });

    code += `}\n`;
    return code;
  }
}

// CLI Handler
if (process.argv[1] && process.argv[1].endsWith('anchor.js')) {
  const args = process.argv.slice(2);
  const engine = new AnchorEngine();
  const specIdx = args.indexOf('--spec');

  if (specIdx !== -1 && args[specIdx + 1]) {
    const specPath = path.resolve(args[specIdx + 1]);
    if (fs.existsSync(specPath)) {
      const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
      console.log('=== GENERATED SERVER ROUTES ===');
      console.log(engine.generateServerRoutes(spec.endpoints || []));
      console.log('=== GENERATED CLIENT SDK ===');
      console.log(engine.generateClientSdk(spec.endpoints || []));
    }
  } else {
    console.log('Usage: node anchor.js --spec <path-to-json-spec>');
  }
}
