
export interface CourseStep {
  id: string;
  order: number;
  title: string;
  type: 'reading' | 'video' | 'pdf' | 'assessment' | 'summary';
  htmlContent?: string;          
  htmlUrl?: string;             
  localHtmlPath?: string;       
  requiresDownload?: boolean;   
}


export const courseSteps: CourseStep[] = [
  {
    id: "1",
    order: 1,
    title: "Read: Programming Fundamentals",
    type: "reading",
    htmlContent: `
      <html>
      <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body style="font-family: system-ui; padding: 20px; line-height: 1.6;">
        <h1>Programming Fundamentals</h1>
        <p>This is a very long reading section...</p>
        <p style="color:#444;">Variables are containers for storing data values...</p>
        <!-- Imagine 2000+ words, images, code blocks, tables here -->
        <pre><code>let x = 5;\nconsole.log(x);</code></pre>
        <img src="https://example.com/code-diagram.png" style="max-width:100%;">
        <button onclick="window.ReactNativeWebView.postMessage('next')">Mark as Read</button>
      </body>
      </html>
    `,
  },
  {
    id: "2",
    order: 2,
    title: "Video Lecture: Variables Deep Dive",
    type: "video",
    htmlUrl: "https://your-lms.com/lectures/video-embed.html", // or local after download
    requiresDownload: true,
    // The HTML page contains: <video src="video.mp4" controls>...</video> + download button
  },
  {
    id: "3",
    order: 3,
    title: "Download & Study: Cheat Sheet PDF",
    type: "pdf",
    htmlUrl: "https://your-lms.com/pdf-viewer.html?pdf=https://example.com/cheatsheet.pdf",
    requiresDownload: true,
    // HTML uses pdf.js or Google viewer iframe for PDF rendering
  },
  {
    id: "4",
    order: 4,
    title: "Assessment: Test Your Knowledge",
    type: "assessment",
    htmlContent: `
      <html>
      <body style="padding:20px;">
        <h2>Quiz: Programming Basics</h2>
        <form id="quiz">
          <p>1. What is a variable?</p>
          <label><input type="radio" name="q1" value="a"> Container for data</label><br>
          <!-- More questions... -->
          <button type="button" onclick="submitQuiz()">Submit</button>
        </form>
        <script>
          function submitQuiz() {
            // simple validation
            const score = /* calculate */;
            window.ReactNativeWebView.postMessage(JSON.stringify({type:'assessment', score}));
          }
        </script>
      </body>
      </html>
    `,
  },
  {
    id: "5",
    order: 5,
    title: "Summary & Congratulations",
    type: "summary",
    htmlContent: `
      <html>
      <body style="text-align:center; padding:40px; font-size:18px;">
        <h1>🎉 Module Complete!</h1>
        <p>You've finished all steps.</p>
        <button onclick="window.ReactNativeWebView.postMessage('course-complete')">Back to Courses</button>
      </body>
      </html>
    `,
  },
];