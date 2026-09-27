import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  ScanLine,
  Waypoints,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundPaths from '../components/ui/BackgroundPaths';
import ZkCryptographicCore3D from '../components/3d/ZkCryptographicCore3D';
import { PREPROD_CONTRACT_ADDRESS } from '../config';

const features = [
  {
    number: '01 / THE VEIL',
    title: 'Your story stays yours.',
    description: 'GPA and household income become a private witness inside your browser. No dossier, no upload, no trail.',
    icon: LockKeyhole,
    tone: '',
    footer: 'LOCAL MEMORY',
    status: 'SEALED',
  },
  {
    number: '02 / THE ORRERY',
    title: 'Proofs move, data does not.',
    description: 'A Compact circuit turns your eligibility into a small mathematical signal the Midnight ledger can understand.',
    icon: Waypoints,
    tone: 'lavender',
    footer: 'WASM CIRCUIT',
    status: '< 190 MS',
  },
  {
    number: '03 / THE MARK',
    title: 'One claim. One quiet yes.',
    description: 'A deterministic nullifier prevents repeat claims while keeping your real-world identity beyond the horizon.',
    icon: Fingerprint,
    tone: 'coral',
    footer: 'MIDNIGHT PREPROD',
    status: 'VERIFIABLE',
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function LandingPage() {
  return (
    <motion.div
      className="world-page"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      <BackgroundPaths className="world-background-paths" />

      <motion.section className="world-hero" variants={reveal}>
        <div className="world-hero-copy">
          <span className="world-kicker">The Astral Archive / Midnight preprod</span>
          <h1 className="world-display">
            Scholarships for the <em>quietly</em> exceptional.
          </h1>
          <p className="world-lede">
            zkScholar is a private passage through the grant application: prove you meet the threshold without handing your GPA, income, or identity to a server.
          </p>

          <div className="world-actions">
            <Link to="/verify" className="world-btn world-btn-primary">
              Enter the verifier <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/about" className="world-btn world-btn-secondary">
              Read the field guide <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="world-trust-row" aria-label="Privacy guarantees">
            <span><Check size={13} aria-hidden="true" /> No server telemetry</span>
            <span><Check size={13} aria-hidden="true" /> Client-side witness</span>
            <span><Check size={13} aria-hidden="true" /> Non-custodial</span>
          </div>
        </div>

        <div className="world-hero-art" aria-hidden="true">
          <div className="world-planet-frame" aria-hidden="true">
            <div className="world-planet-core world-pulse" />
            <ZkCryptographicCore3D className="relative z-10 h-full w-full" interactive={true} />
          </div>
          <div className="world-orbit-label top world-float">
            <small>Signal integrity</small>
            <strong><span className="world-pulse" style={{ display: 'inline-block', width: 7, height: 7, marginRight: 6, borderRadius: '50%', background: 'var(--world-lime)' }} />100% private</strong>
          </div>
          <div className="world-orbit-label bottom">
            <small>Current atmosphere</small>
            <strong>Midnight / open</strong>
          </div>
          <span className="world-hero-number" aria-hidden="true">01</span>
        </div>
      </motion.section>

      <motion.div className="world-rail" variants={reveal}>
        <div className="world-rail-item">
          <span className="world-rail-label">The proposition</span>
          <span className="world-rail-value">Let eligibility travel without the evidence.</span>
        </div>
        <div className="world-rail-item">
          <span className="world-rail-label">The network</span>
          <span className="world-rail-value accent">Midnight / Preprod</span>
        </div>
        <div className="world-rail-item">
          <span className="world-rail-label">The artifact</span>
          <span className="world-rail-value">A verifiable credential, not a data exhaust trail.</span>
        </div>
      </motion.div>

      <section className="world-section" aria-labelledby="gates-heading">
        <motion.div className="world-section-head" variants={reveal}>
          <div>
            <span className="world-index">02 / Three gates to one quiet yes</span>
            <h2 id="gates-heading" className="world-section-title">A little <em>magic.</em> A lot of mathematics.</h2>
          </div>
          <p className="world-section-intro">The interface is an atlas; the underlying promise is simple: sensitive facts never need to become public facts.</p>
        </motion.div>

        <div className="world-feature-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.number}
                variants={reveal}
                className={`world-card ${feature.tone}`}
                transition={{ delay: index * 0.08 }}
              >
                <span className="world-card-number">{feature.number}</span>
                <div className="world-card-icon"><Icon size={21} aria-hidden="true" /></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="world-card-footer">
                  <span>{feature.footer}</span>
                  <strong>{feature.status}</strong>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="world-section" aria-labelledby="atlas-heading">
        <motion.div className="world-section-head" variants={reveal}>
          <div>
            <span className="world-index">03 / Observer map</span>
            <h2 id="atlas-heading" className="world-section-title">A map of what <em>doesn’t</em> leave.</h2>
          </div>
        </motion.div>

        <motion.div className="world-atlas" variants={reveal}>
          <div className="world-atlas-map" role="img" aria-label="Abstract map of private witness and public proof">
            <span className="world-map-pin one">Your device</span>
            <span className="world-map-pin two">Public proof</span>
            <div className="world-atlas-legend">
              <span>Private witness / north</span>
              <span>Ledger signal / south</span>
            </div>
          </div>
          <div className="world-atlas-copy">
            <div>
              <span className="world-index">The line is deliberate</span>
              <h3>What travels is <em>truth.</em> What stays is you.</h3>
              <p>Traditional grant systems ask for the whole story. zkScholar asks a circuit one narrow question: does this applicant satisfy the published criteria?</p>
              <div className="world-visibility-list">
                <div className="world-visibility-row"><span>Exact GPA</span><strong><EyeOff size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} /> hidden</strong></div>
                <div className="world-visibility-row"><span>Household income</span><strong><EyeOff size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} /> hidden</strong></div>
                <div className="world-visibility-row"><span>Eligibility result</span><strong><ScanLine size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} /> verifiable</strong></div>
              </div>
            </div>
            <Link to="/about" className="world-btn world-btn-secondary" style={{ alignSelf: 'flex-start', borderColor: 'rgba(13,21,18,.22)', color: 'var(--world-ink)', background: 'rgba(13,21,18,.04)' }}>
              Explore the architecture <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </section>

      <motion.section className="world-cta" variants={reveal} aria-labelledby="cta-heading">
        <div className="world-cta-copy">
          <span className="world-index">04 / Begin your passage</span>
          <h3 id="cta-heading">Bring your proof. Leave your <em>secrets.</em></h3>
          <p>Connect a Midnight wallet and step through a verifier built to show less, not collect more.</p>
        </div>
        <Link to="/verify" className="world-btn world-btn-primary">
          Open the verifier <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </motion.section>

      <span className="sr-only">Contract: {PREPROD_CONTRACT_ADDRESS}</span>
    </motion.div>
  );
}
