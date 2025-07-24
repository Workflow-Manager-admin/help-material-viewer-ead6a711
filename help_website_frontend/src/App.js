import React, { useState, useMemo } from "react";
import "./App.css";

// Help topics and section lookup extracted from PDF
const TOPICS = [
  { id: "code-gen-guide", title: "CODE GENERATION GUIDE", },
  { id: "first-web-app", title: "Create your first Web APP" },
  { id: "step-1", title: "Step 1: Start from the Home Screen" },
  { id: "step-2", title: "Step 2: Enter Your Prompt" },
  { id: "step-3", title: "Step 3: Confirm Project Overview and Core features." },
  { id: "step-4", title: "Step 4: Let Kavia Prepare the Workspace" },
  { id: "step-5", title: "Step 5: Collaborate with Kavia via Chat" },
  { id: "step-6", title: "Step 6: Preview" },
  { id: "step-7", title: "Step 7: Enabling the Edit Mode" },
  { id: "step-8", title: "Step 8: Deployment" },
  { id: "step-9", title: "Step 9 : Terminate" },
  { id: "ingest-codebase", title: "INGEST EXISTING CODEBASE" },
  { id: "basic-query", title: "1. Basic Querying" },
  { id: "adv-query", title: "2. Advanced Query" },
  { id: "code-mainten", title: "3. Code Maintenance" },
  { id: "notable", title: "NOTABLE POINTS" },
];

// Section content extracted and cleaned from PDF
const HELP_CONTENT = {
  "code-gen-guide": `
Sign into Kavia AI

• Add your Referral Code → Sign into Kavia AI with a verifiable email id.
Two Step Verification and Sign in 
1. Enable your access through set password link received via Welcome Mail
2. Login to the portal using the Login URL in the Welcome Mail
  `,
  "first-web-app": `
Let's walk through the process of creating a simple website using Kavia...
(see Steps below)
  `,
  "step-1": `
To begin, navigate to the Home section from the left sidebar. At the center of the screen, you’ll be prompted with “What do you want to build today?”—ensure the Apps tab is selected. Then, scroll down to choose the type of application; for this tutorial, select Web as the application type and React as the framework.
  `,
  "step-2": `
In the input box, describe the app you want to create. In this tutorial, I will enter the following prompt and Select Web because I am going to make a web application and select React as the stack and Click the Arrow Icon:

"Create a modern, responsive personal portfolio website for a freelance architect. The site should include the following sections: Home, About Me, Projects, Skills, Contact. Each section should be accessible via a navigation bar. The Projects section should display 3 sample projects with images, titles, and short descriptions. The Contact section should include a form with fields for Name, Email, Subject, and Message. Style the site with a clean, minimal design using modern fonts and subtle animations. Make it mobile-friendly and accessible."
Kavia will process your request and begin building the application automatically. Complete with frontend and backend code, UI layout, and logic.
  `,
  "step-3": `
Would you like to Use your own Github Account for the projects?
In the Third-Party Integrations section, connect your GitHub account by selecting it from the dropdown. If it’s not listed, click “Add Account” to link it. Ensure the correct account is selected before moving forward.

Want to connect your project with real time Database for storage?
To provision your app’s database, connect your Supabase account by clicking the “Connect” button. Authenticate and set up a Supabase project for your application.
  `,
  "step-4": `
Click on Start Implementation and Wait for the initial setup to be complete
  `,
  "step-5": `
Start with Planning, by asking Kavia to create a plan.

Image or Document as input - If you have an image or document which you want KAVIA to use for your project, provide as input initially.
Steps: Click the + icon near chat → Upload files → Choose pdf, jpg, png, or jpeg files as input
  `,
  "step-6": `
Go to Preview to check the Live Application!
  `,
  "step-7": `
Enabling Edit Mode lets you directly select and modify components in the preview without using chat commands. Remember to save your changes, and once all edits are done, click Disable Edit Mode to resume work.
  `,
  "step-8": `
Click the + button next to Deploy, select the container. For multi-container projects, select accordingly. Configure and click Create Frontend Deployment. Kavia will deploy the app for you.
  `,
  "step-9": `
Choose 1. Save and Exit → to save finalized code. 2. Discard and Exit → to discard the session. 3. Continue session → to resume later.
  `,
  "ingest-codebase": `
Go to Project List below home icon → Click Import.

Provide Project Name, Description → Choose Github to select repo → Select Query (to understand your code) / Modify (to modify your code with Prompts)
  `,
  "basic-query": `
Select Repositories → Query → Basic Query. Select the Model. Recommend: Clause 3.5 for Architecture / GPT 4.1 for reduced credit use.
Give a prompt about the code → Visualize response on the Right Panel → Export or Save as required
  `,
  "adv-query": `
For Deep Analysis → Wait setup → Provide prompt for doc you want generated.
  `,
  "code-mainten": `
Prefer Code Maintenance for modifying code based on prompts. Select repositories → Start session → Give prompts. Preview not in all frameworks; use PR and test locally when required.
  `,
  "notable": `
1. Session ends after 30min of inactivity—terminate the session to save code.
2. GPT 4.1 is default and the affordable model for Code Generation.
3. Full stack app support is possible, but for best results, proceed with Web app + Supabase Integration for realtime.
  `
};

// Header component
function AppHeader({ theme, onToggleTheme }) {
  return (
    <header className="kv-header">
      <span className="kv-logo">
        <span className="kv-logo-dot" />
        <span className="kv-logo-text">KAVIA Help</span>
      </span>
      <nav className="kv-nav">
        <a href="#code-gen-guide">Guide</a>
        <a href="#ingest-codebase">Ingest Codebase</a>
        <a href="#notable">Notes</a>
      </nav>
      <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}

// Sidebar navigation
function Sidebar({ topics, currentId, onSelect, filterText }) {
  return (
    <aside className="kv-sidebar">
      <div className="kv-sidebar-title">Topics</div>
      <ul className="kv-sidebar-list">
        {topics.filter(
          t => t.title.toLowerCase().includes(filterText.toLowerCase())
        ).map(topic => (
          <li key={topic.id} className={topic.id === currentId ? "active" : ""}>
            <button
              tabIndex={0}
              onClick={() => onSelect(topic.id)}
              className="kv-sidebar-link"
            >{topic.title}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/**
 * Main content panel for displaying help topics.
 * Adds a placeholder image at the top of each help/article section and an additional illustration image within the section.
 */
function HelpContent({ topicId }) {
  const htmlWithIllustration = useMemo(() => {
    const raw = HELP_CONTENT[topicId] || "";
    // Build the HTML with an illustration placeholder image after the first paragraph
    const lines = raw
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    let injected = [];
    lines.forEach((line, i) => {
      // Insert illustration image after the first content paragraph
      injected.push(`<p key=${i}>${line}</p>`);
      if (i === 0) {
        injected.push(
          `<div style="text-align:center; margin:24px 0;"><img src="https://via.placeholder.com/320x120?text=Illustration+Placeholder" alt="Illustration Placeholder" style="max-width:320px; width:100%; border:1.5px dashed #888; border-radius:6px;"/><div style="color:#666;font-size:0.97rem; margin-top:6px;">Illustration Placeholder</div></div>`
        );
      }
    });
    return { __html: injected.join("") };
  }, [topicId]);

  return (
    <div className="kv-main-content">
      <article>
        {/* PUBLIC_INTERFACE: Display dummy/placeholder image at top of section */}
        <img
          src="https://via.placeholder.com/400x200?text=Dummy+Image"
          alt="Dummy section banner"
          style={{ display: "block", margin: "0 auto 2rem auto", width: "100%", maxWidth: 400, borderRadius: 8, border: "1.5px dashed #bbb" }}
        />
        <span dangerouslySetInnerHTML={htmlWithIllustration} />
      </article>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [currentTopic, setCurrentTopic] = useState(TOPICS[0].id);
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const visibleTopics = useMemo(() =>
      search
        ? TOPICS.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
        : TOPICS,
    [search]
  );

  // Select first visible topic automatically when search narrows
  React.useEffect(() => {
    if (!visibleTopics.find(t => t.id === currentTopic)) {
      setCurrentTopic(visibleTopics[0]?.id ?? "");
    }
  }, [search]); // eslint-disable-line

  // PUBLIC_INTERFACE
  const handleSelectTopic = id => setCurrentTopic(id);

  // PUBLIC_INTERFACE
  const handleSearch = e => setSearch(e.target.value);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <div className="kv-app">
      <AppHeader theme={theme} onToggleTheme={toggleTheme} />
      <div className="kv-content-wrapper">
        <Sidebar
          topics={TOPICS}
          currentId={currentTopic}
          onSelect={handleSelectTopic}
          filterText={search}
        />
        <main className="kv-main">
          <div className="kv-search-panel">
            <input
              className="kv-search-input"
              placeholder="Search topics…"
              value={search}
              onChange={handleSearch}
              aria-label="Search topics"
              autoFocus
            />
          </div>
          <HelpContent topicId={currentTopic} />
        </main>
      </div>
      <footer className="kv-footer">
        © {new Date().getFullYear()} KAVIA | Product Help
      </footer>
    </div>
  );
}

export default App;
