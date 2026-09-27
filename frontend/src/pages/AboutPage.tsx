import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Code2, ExternalLink, LockKeyhole, Terminal } from 'lucide-react';

const chapters = [
  {
    index: '01 / THE OLD WAY',
    title: 'A grant should not require your whole life.',
    icon: BookOpen,
    tone: 'coral',
    body: 'Traditional scholarship applications collect transcripts, financial statements, and household tax returns into centralized systems that are difficult to audit and impossible to take back.',
  },
  {
    index: '02 / THE INVERSION',
    title: 'The circuit asks one small question.',
    icon: LockKeyhole,
    tone: 'lime',
    body: 'zkScholar turns your GPA and income into private witnesses. A local Compact circuit proves whether they satisfy the published criteria without exposing either value to an authority or a server.',
    points: [
      'Your GPA and income remain in browser memory.',
      'WASM computes the constraint satisfaction locally.',
      'Only the succinct proof travels to Midnight Preprod.',
    ],
  },
  {
    index: '03 / THE OPEN SOURCE TRAIL',
    title: 'Readable systems build better trust.',
    icon: Terminal,
    tone: 'lavender',
    body: 'zkScholar is built for the Midnight New Moon to Full Hackathon with Compact, React, Vite, Three.js, and the Midnight.js SDK.',
    link: true,
  },
];

export default function AboutPage() {
  return (
    <motion.div
      className="world-guide"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <header className="world-guide-header">
        <span className="world-index">Field guide / 00</span>
        <h1>Read the map before you <em>cross it.</em></h1>
        <p>zkScholar is a privacy-preserving passage through scholarship verification. This is the short version of what happens behind the glow.</p>
      </header>

      <div className="world-guide-grid">
        {chapters.map((chapter, index) => {
          const Icon = chapter.icon;
          return (
            <motion.article
              key={chapter.index}
              className={`world-guide-card ${chapter.tone}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="world-guide-card-top">
                <span>{chapter.index}</span>
                <div className="world-guide-icon"><Icon size={19} aria-hidden="true" /></div>
              </div>
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
              {chapter.points && (
                <ul>
                  {chapter.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
              {chapter.link && (
                <a href="https://github.com/Aman-Raj-bat/zkScholar" target="_blank" rel="noreferrer" className="world-guide-link">
                  View source code <Code2 size={14} aria-hidden="true" /> <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </motion.article>
          );
        })}
      </div>

      <section className="world-guide-note">
        <div>
          <span className="world-index">The guiding principle</span>
          <h2>What travels is <em>truth.</em> What stays is you.</h2>
        </div>
        <div className="world-guide-note-copy">
          <p>The ledger can confirm that a claim is valid without learning the private values that made it valid. That is the line zkScholar is built to keep.</p>
          <a href="https://docs.midnight.network/" target="_blank" rel="noreferrer" className="world-guide-note-link">Midnight developer docs <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </section>
    </motion.div>
  );
}
