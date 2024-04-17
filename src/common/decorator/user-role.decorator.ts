import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRolesGuard } from '../guards/user-roles.guard';
import { RolesEnum } from '../../enum/roles.enum';

export const HttpUserRole = (...params: RolesEnum[]): ((...arg: any[]) => void) => {
	return applyDecorators(
		SetMetadata('possibleUserRoles', params),
		SetMetadata('isPublic', true),
		UseGuards(UserRolesGuard)
	);
};
