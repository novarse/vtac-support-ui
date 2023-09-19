export interface ChatSentenceDto {
	context: string;
	user: string;
	assistent: string;
	usage: RootObjectUsage;
	ignore: boolean;
}
export interface RootObjectUsage {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
}
