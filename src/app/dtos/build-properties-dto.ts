export class BuildPropertiesDto {
  gitBranch: string | undefined;
  buildMachine: string | undefined;
  commitId: string | undefined;
  commitTime: string | undefined;
  lastCommitUser: string | undefined;
  buildTime: string | undefined;

  constructor(gitBranch?: string, buildMachine?: string, commitId?: string, commitTime?: string, lastCommitUser?: string,
  buildTime?: string) {
    this.gitBranch = gitBranch;
    this.buildMachine = buildMachine;
    this.commitId = commitId;
    this.commitTime = commitTime;
    this.lastCommitUser = lastCommitUser;
    this.buildTime = buildTime;
  }

}
