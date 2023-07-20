interface Version {
  target: string;
  buildTime: string;
  branch: string;
  tag: string;
  commit: string;
  rustVersion: string;
  pipelineId: string;
}

interface ONECore {
  createOrg(): Promise<string>;
  getVersion(): Promise<Version>;
}

declare const rnONE: ONECore;
export default rnONE;
