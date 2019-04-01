export type SwaggerDefinition = {
	title?: string;
	type: string;
	description?: string;
	properties?: { [key: string]: SwaggerDefinition };
	required?: string[];
};

export type SwaggerDefinitions = {
	[key: string]: SwaggerDefinition;
};

export type MethodParameter = {
	name: string;
	in: 'body' | 'path' | 'query';
	description?: string;
	required?: boolean;
	schema?: { $ref?: string; type?: string; [key: string]: any };
};

export type Verb = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete';

export type PathsDefinition = {
	[key: string]: {
		[key in Verb]: {
			summary: string;
			operationId: string;
			parameters: MethodParameter[];
			consumes: string[];
			produces: string[];
			tags: string[];
			responses: {
				[key: number]: {
					description: string;
				};
			};
		}
	};
};