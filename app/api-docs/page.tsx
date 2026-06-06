'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ApiDocsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Initialize Swagger UI once script loads
    const win = window as unknown as Record<string, unknown>;
    const init = () => {
      if (typeof win.SwaggerUIBundle === 'function') {
        (win.SwaggerUIBundle as (config: Record<string, unknown>) => void)({
          url: '/api/mcp/api-docs-json',
          dom_id: '#swagger-ui',
          deepLinking: true,
          layout: 'BaseLayout',
        });
      }
    };
    // Try immediately in case script already loaded
    init();
    // Also listen for script load
    const interval = setInterval(() => {
      if (typeof win.SwaggerUIBundle === 'function') {
        init();
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1a1a2e' }}>
        <p style={{ color: '#b0b0c0' }}>Loading API Documentation...</p>
      </div>
    );
  }

  return (
    <>
      {/* Swagger UI CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui.css"
      />
      <div className="min-h-screen" style={{ background: '#1a1a2e' }}>
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0a0514 0%, #1a0a2e 50%, #0a0514 100%)',
            borderBottom: '1px solid rgba(156, 39, 176, 0.3)',
            padding: '24px 32px',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#00e5ff',
                fontFamily: 'JetBrains Mono, monospace',
                margin: 0,
              }}
            >
              Floyd MCP System API
            </h1>
            <p style={{ color: '#b0b0c0', margin: '8px 0 0', fontSize: 14 }}>
              3 MCP servers \u2022 67+ tools \u2022 Development operations, AI cognition, and multi-agent orchestration
            </p>
          </div>
        </div>

        {/* Swagger UI container */}
        <div id="swagger-ui" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }} />
      </div>

      {/* Swagger UI JS */}
      <Script
        src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"
        strategy="afterInteractive"
      />

      {/* Dark theme overrides for Swagger UI */}
      <style jsx global>{`
        .swagger-ui { background: transparent !important; }
        .swagger-ui .topbar { display: none !important; }
        .swagger-ui .info { margin: 20px 0 !important; }
        .swagger-ui .info .title { color: #00e5ff !important; font-family: 'JetBrains Mono', monospace !important; }
        .swagger-ui .info .description p { color: #b0b0c0 !important; }
        .swagger-ui .scheme-container { background: rgba(10,5,20,0.8) !important; border: 1px solid rgba(156,39,176,0.3) !important; border-radius: 8px !important; padding: 16px !important; }
        .swagger-ui .opblock-tag { color: #e0e0e0 !important; border-bottom-color: rgba(156,39,176,0.3) !important; }
        .swagger-ui .opblock { background: rgba(10,5,20,0.6) !important; border-color: rgba(156,39,176,0.3) !important; border-radius: 8px !important; }
        .swagger-ui .opblock .opblock-summary { border-color: transparent !important; }
        .swagger-ui .opblock .opblock-summary-method { border-radius: 4px !important; }
        .swagger-ui .opblock .opblock-summary-description { color: #b0b0c0 !important; }
        .swagger-ui .opblock-body { background: rgba(10,5,20,0.4) !important; }
        .swagger-ui .opblock-description-wrapper p { color: #b0b0c0 !important; }
        .swagger-ui .model-box { background: rgba(10,5,20,0.6) !important; }
        .swagger-ui .models { border-color: rgba(156,39,176,0.3) !important; }
        .swagger-ui .model-title { color: #e0e0e0 !important; }
        .swagger-ui table thead tr th { color: #b0b0c0 !important; border-bottom-color: rgba(156,39,176,0.3) !important; }
        .swagger-ui table tbody tr td { color: #e0e0e0 !important; border-bottom-color: rgba(156,39,176,0.2) !important; }
        .swagger-ui .parameter__name { color: #00e5ff !important; }
        .swagger-ui .parameter__type { color: #ce93d8 !important; }
        .swagger-ui .response-col_status { color: #00e5ff !important; }
        .swagger-ui .response-col_description p { color: #b0b0c0 !important; }
        .swagger-ui .btn { border-radius: 4px !important; }
        .swagger-ui .btn.execute { background: #9c27b0 !important; border-color: #9c27b0 !important; }
        .swagger-ui .btn.authorize { color: #00e5ff !important; border-color: #00e5ff !important; }
        .swagger-ui select { background: rgba(10,5,20,0.8) !important; color: #e0e0e0 !important; border-color: rgba(156,39,176,0.3) !important; }
        .swagger-ui input[type=text] { background: rgba(10,5,20,0.8) !important; color: #e0e0e0 !important; border-color: rgba(156,39,176,0.3) !important; }
        .swagger-ui textarea { background: rgba(10,5,20,0.8) !important; color: #e0e0e0 !important; border-color: rgba(156,39,176,0.3) !important; }
        .swagger-ui .highlight-code { background: rgba(10,5,20,0.8) !important; }
        .swagger-ui .highlight-code pre { color: #e0e0e0 !important; }
        .swagger-ui .model { color: #e0e0e0 !important; }
        .swagger-ui .prop-type { color: #ce93d8 !important; }
        .swagger-ui .renderedMarkdown p { color: #b0b0c0 !important; }
        .swagger-ui .opblock-section-header { background: rgba(10,5,20,0.8) !important; }
        .swagger-ui .opblock-section-header h4 { color: #e0e0e0 !important; }
        .swagger-ui .opblock-section-header label { color: #b0b0c0 !important; }
        .swagger-ui .tab li { color: #b0b0c0 !important; }
        .swagger-ui .tab li.active { color: #00e5ff !important; }
        .swagger-ui .opblock-description-wrapper, .swagger-ui .opblock-external-docs-wrapper { color: #b0b0c0 !important; }
        .swagger-ui .opblock-body pre.microlight { background: rgba(10,5,20,0.9) !important; color: #e0e0e0 !important; }
        .swagger-ui .response-col_links { color: #b0b0c0 !important; }
        .swagger-ui .responses-inner h4, .swagger-ui .responses-inner h5 { color: #e0e0e0 !important; }
        .swagger-ui .model-container { background: rgba(10,5,20,0.6) !important; }
        .swagger-ui section.models h4 { color: #e0e0e0 !important; }
        .swagger-ui .body-param-options label { color: #b0b0c0 !important; }
        .swagger-ui .btn-group .btn { color: #b0b0c0 !important; }
      `}</style>
    </>
  );
}
