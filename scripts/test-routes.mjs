const routes = [
  "",
  "components/code-block",
  "components/citation",
  "components/conversation-history",
  "components/suggested-prompts",
  "components/voice-input-button",
  "components/slash-command-menu",
  "components/rate-limit-banner",
  "components/token-usage-bar",
  "components/connection-status",
  "components/diff-view",
  "components/confirm-dialog",
  "components/artifact-panel",
  "components/tabs-panel",
  "components/feedback-buttons",
  "components/rating-stars",
  "components/api-key-input",
  "components/temperature-slider",
  "components/system-prompt-editor",
  "components/image-upload-preview",
  "components/audio-player",
  "components/tooltip",
  "components/skeleton",
  "components/empty-state",
  "components/toast",
  "components/prompt-box",
  "components/message-bubble",
  "components/thinking",
  "components/approval-card"
];

async function checkRoutes() {
  console.log(`Testing ${routes.length} routes against http://localhost:3005 ...\n`);
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    const url = `http://localhost:3005/${r}`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        console.log(`[PASS 200] ${url}`);
        passed++;
      } else {
        console.error(`[FAIL ${res.status}] ${url}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERROR] ${url} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

checkRoutes();
