import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type ModelSpecKey =
  | 'Resonance Field'
  | 'Vector Logic'
  | 'Cognitive Mapping'
  | 'Hemispheric Sync (Hz)'
  | 'Temporal Feedback';

type PreferenceKey =
  | 'Experience Palette'
  | 'Value Capture Mode'
  | 'Monetization Cadence'
  | 'Audience Cohort';

type ExperienceKey =
  | 'Insight Stream'
  | 'Adoption Pulse'
  | 'Feedback Loop'
  | 'Next-Stream Playbook'
  | 'Cache Win Ratio';

interface ModelNode {
  id: string;
  name: string;
  status: 'online' | 'warming' | 'idle';
  description: string;
  specs: Record<ModelSpecKey, string>;
  preferences: Record<PreferenceKey, string>;
  experience: Record<ExperienceKey, string>;
}

@Component({
  selector: 'app-model-orchestrator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './model-orchestrator.component.html',
  styleUrls: ['./model-orchestrator.component.css'],
})
export class ModelOrchestratorComponent {
  readonly models = signal<ModelNode[]>([
    {
      id: 'aurora-t1',
      name: 'Aurora T1 Prisma',
      status: 'online',
      description:
        'Multimodal strategist tuned for diplomatic briefings and resonant storytelling.',
      specs: {
        'Resonance Field': 'Auric lattice — 7.83 Hz harmonic carrier',
        'Vector Logic': 'Triangulated empathic inference stack',
        'Cognitive Mapping': 'Mnemonic holograph neural atlas',
        'Hemispheric Sync (Hz)': '432',
        'Temporal Feedback': 'Bidirectional 18 ms latency loop',
      },
      preferences: {
        'Experience Palette': 'Iridescent narrative overlays with living transcripts',
        'Value Capture Mode': 'Co-creative licensing with retention escalators',
        'Monetization Cadence': 'Weekly resonance summits & premium pulse drops',
        'Audience Cohort': 'Federal clearance councils & visionary founders',
      },
      experience: {
        'Insight Stream': 'Pendo pseudo→real resonance audit every 6 minutes',
        'Adoption Pulse': '86% guided tour completion with empathic checkpoints',
        'Feedback Loop': 'Bidirectional NPS rituals + qualitative field memos',
        'Next-Stream Playbook': 'Auto-orchestrated launch cadences for clearance cohorts',
        'Cache Win Ratio': '92% token cache reuse via anticipatory coaching',
      },
    },
    {
      id: 'helios-r5',
      name: 'Helios R5 Vectorium',
      status: 'warming',
      description:
        'High-energy analytical core optimized for multi-lingual negotiations and flightpath logic.',
      specs: {
        'Resonance Field': 'Solar flare tessellation with adaptive shielding',
        'Vector Logic': 'Quantum triangulation + orbital heuristics',
        'Cognitive Mapping': 'Polyglot cognition lattice (128 language channels)',
        'Hemispheric Sync (Hz)': '528',
        'Temporal Feedback': 'Forward-reflexive 12 ms delta',
      },
      preferences: {
        'Experience Palette': 'Tactile command console with chroma-coded metrics',
        'Value Capture Mode': 'Outcome-based sovereign contracts',
        'Monetization Cadence': 'Per-mission retainers with success multipliers',
        'Audience Cohort': 'Aerospace alliances & autonomous fleet directors',
      },
      experience: {
        'Insight Stream': 'Pendo adoption beacons with orbital escalation tracks',
        'Adoption Pulse': '74% pilot-to-production conversion velocity',
        'Feedback Loop': 'Flightpath retros harvested via embedded micro-surveys',
        'Next-Stream Playbook': 'Mission kit templates with multilingual prompts',
        'Cache Win Ratio': '88% kv-cache preservation under peak telemetry',
      },
    },
    {
      id: 'selene-q9',
      name: 'Selene Q9 Liminal',
      status: 'idle',
      description:
        'Dreamlike experiential architect for conscious commerce and cultural diplomacy.',
      specs: {
        'Resonance Field': 'Lunar tide entrainment with crystalline overtones',
        'Vector Logic': 'Spiral harmonics + empathic Bayesian mirrors',
        'Cognitive Mapping': 'Mythopoeic schema tracer with collective recall',
        'Hemispheric Sync (Hz)': '396',
        'Temporal Feedback': 'Retrograde echo — 33 ms reflective buffer',
      },
      preferences: {
        'Experience Palette': 'Immersive silkwave UI with scent + aurora gradients',
        'Value Capture Mode': 'Patronage guild with shared prosperity splits',
        'Monetization Cadence': 'Seasonal convergence ceremonies',
        'Audience Cohort': 'Cultural stewards & experiential venture circles',
      },
      experience: {
        'Insight Stream': 'Pendo sentiment rivers blending ritual + revenue cues',
        'Adoption Pulse': '91% ritual completion with aurora follow-through',
        'Feedback Loop': 'Dream archive playback fused with guided annotations',
        'Next-Stream Playbook': 'Ceremony blueprinting + sponsorship enablement',
        'Cache Win Ratio': '94% ambient cache sustain via lunar sync',
      },
    },
  ]);

  readonly selectedModelId = signal<string | null>(null);

  readonly selectedModel = computed(() =>
    this.models()
      .find((model) => model.id === this.selectedModelId()) ?? null,
  );

  readonly specEntries = computed(() => {
    const model = this.selectedModel();
    if (!model) {
      return [] as Array<{ key: ModelSpecKey; value: string }>;
    }
    return (Object.entries(model.specs) as Array<[
      ModelSpecKey,
      string,
    ]>).map(([key, value]) => ({ key, value }));
  });

  readonly preferenceEntries = computed(() => {
    const model = this.selectedModel();
    if (!model) {
      return [] as Array<{ key: PreferenceKey; value: string }>;
    }
    return (Object.entries(model.preferences) as Array<[
      PreferenceKey,
      string,
    ]>).map(([key, value]) => ({ key, value }));
  });

  readonly experienceEntries = computed(() => {
    const model = this.selectedModel();
    if (!model) {
      return [] as Array<{ key: ExperienceKey; value: string }>;
    }
    return (Object.entries(model.experience) as Array<[
      ExperienceKey,
      string,
    ]>).map(([key, value]) => ({ key, value }));
  });

  selectModel(modelId: string): void {
    this.selectedModelId.set(
      this.selectedModelId() === modelId ? null : modelId,
    );
  }

  modelStateLabel(model: ModelNode): string {
    switch (model.status) {
      case 'online':
        return 'Ready';
      case 'warming':
        return 'Spooling';
      case 'idle':
      default:
        return 'Idle';
    }
  }
}
