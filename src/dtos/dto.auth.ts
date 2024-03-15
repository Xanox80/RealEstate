export class UserParamsDto {
	username?: string;
	password?: string;
	roleId?: number;
}

export class NewAccessTokenResultDto {
	success: boolean;
	accessToken?: string;
}
