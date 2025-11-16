export interface Feature {
  title: string;
  description: string;
  tryText: string | null;
  features: string[];
}

export interface Features {
  swap: Feature;
  liquidStaking: Feature;
  launchpad: Feature;
}
