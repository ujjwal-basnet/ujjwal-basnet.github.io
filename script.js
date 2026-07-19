// Initialize Lucide Icons on load
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
});

// Prompts Data Store
const promptsData = {
    digest: {
        title: "Morning Business Digest",
        code: `Set up a recurring cron job: every morning at 8am, pull the latest updates on NEPSE indices, key regulatory changes from Nepal Rastra Bank, and top business headlines from local news portals. Summarize the 5 most critical items in bullet points. Deliver to telegram. Keep it concise for a quick morning read. Note: Please use OpenClaw or Hermes for this task.`
    },
    expenses: {
        title: "NPR Expense Tracker",
        code: `When I mention a business expense, log it in NPR to ~/expenses/YYYY-MM.csv with columns: date, amount (NPR), category, and payment method (Cash/Fonepay/Bank). Categorize them into Inventory, Operations, or Marketing. Generate a total summary at the end of every month. Note: Please use OpenClaw or Hermes for this task.`
    },
    compliance: {
        title: "Compliance & Regulatory Tracker",
        code: `When I upload a regulatory notice or document, identify key deadlines, required actions, and the department involved (e.g., IRD, OCR). Log these into a ~/compliance-tracker.md file and send me a reminder 3 days before any deadline via Viber. Note: Please use OpenClaw or Hermes for this task.`
    },
    meetings: {
        title: "Meeting Notes Summarizer",
        code: `When I provide meeting notes, create a summary with: Key Decisions, Formal Action Items, and a separate "Viber/WhatsApp Follow-ups" section for informal tasks. Save this to ~/meetings/YYYY-MM-DD.md and draft the follow-up messages I need to send. Note: Please use OpenClaw or Hermes for this task.`
    }
};

let activePromptKey = "digest";

// Switch Business Prompt inside widget
function showPrompt(key) {
    if (!promptsData[key]) return;
    
    activePromptKey = key;
    
    // Update active tab styling
    const tabs = document.querySelectorAll(".prompt-tab");
    tabs.forEach(tab => {
        tab.classList.remove("active");
        // Simple string matching based on onclick attribute parameters
        if (tab.getAttribute("onclick").includes(key)) {
            tab.classList.add("active");
        }
    });
    
    // Update displayed title and code contents
    document.getElementById("prompt-title").innerText = promptsData[key].title;
    document.getElementById("prompt-code-box").innerText = promptsData[key].code;
}

// Copy prompt code to clipboard
function copyActivePrompt() {
    const codeText = promptsData[activePromptKey].code;
    
    navigator.clipboard.writeText(codeText)
        .then(() => {
            const statusMsg = document.getElementById("copy-status");
            statusMsg.classList.add("show");
            
            setTimeout(() => {
                statusMsg.classList.remove("show");
            }, 2000);
        })
        .catch(err => {
            console.error("Failed to copy prompt: ", err);
        });
}
