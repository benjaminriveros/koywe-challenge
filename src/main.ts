import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthGuard } from './guard/auth.guard';
import { SecurityMiddleware } from './middleware/security.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    const securityMiddleware = new SecurityMiddleware({ });

    app.use(securityMiddleware.use.bind(securityMiddleware));

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('API Documentation')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('auth', 'Authentication and Authorization')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalGuards(app.get(AuthGuard));

    const port = process.env.PORT || 3000
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
}
bootstrap();
