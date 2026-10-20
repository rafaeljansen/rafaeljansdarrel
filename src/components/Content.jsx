
import AboutMe from './contents/AboutMe';
import Projects from './contents/Projects';

import Contact from './contents/Contact';
import './Content.css';

function Content({ activeTab }) {
  return (
    <main className="content-area">
      {activeTab === 'about' && <AboutMe />}
      {activeTab === 'projects' && <Projects />}
      {activeTab === 'contact' && <Contact />}
    </main>
  );
}

export default Content;