// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
// import { Mongoose } from 'mongoose';

// export async function bootstrap() {
// 	const app = await NestFactory.create(AppModule);
// 	const config = new DocumentBuilder()
// 		.setTitle('Real Estate')
// 		.setDescription('Build real estate')
// 		.setVersion('1.0')
// 		.addTag('Houses')
// 		.build();
// 	const document = SwaggerModule.createDocument(app, config);
// 	SwaggerModule.setup('api/docs', app, document);
// 	const mongoose = app.get(Mongoose);
// 	mongoose.async().then(() => {
// 		ensureRoles().catch(console.error);
// 	});
// 	const options: SwaggerDocumentOptions = {
// 		operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
// 	};
// 	const document = SwaggerModule.createDocument(app, config, options);

// 	await app.listen(3000);
// }
