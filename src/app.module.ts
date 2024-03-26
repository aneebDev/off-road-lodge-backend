import * as redisStore from 'cache-manager-redis-store'
import { envSchema } from './config/schema/env.schema'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { CacheModule } from "@nestjs/common/cache";
import { TypeOrmModule } from '@nestjs/typeorm'
import { GoogleStrategy } from './strategies/google-auth-strategy'
import { TwilioModule } from 'nestjs-twilio'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { User } from './modules/users/schemas/user.schema'
import { MailModule } from './modules/mail/mail.module'
import { FaqsModule } from './modules/faqs/faqs.module';
import { ContactUsModule } from './modules/contact-us/contact-us.module';
import { ContactUs } from './modules/contact-us/entities/contact-us.entity'
import { Faq } from './modules/faqs/entities/faq.entity'
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { userPost } from './modules/post/entities/post.entity'
import { Comment } from './modules/comment/entities/comment.entity'
import { likeDislike } from './modules/post/entities/like-dislike.entity'
import { PlaceModule } from './modules/place/place.module';
import { AtvModule } from './modules/atv/atv.module';
import { Place } from './modules/place/entities/place.entity'
import { GuidedToursModule } from './modules/guided-tours/guided-tours.module';
import { Atv } from './modules/atv/entities/atv.entity'
import { GuidedTour } from './modules/guided-tours/entities/guided-tour.entity'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MailModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../'),
      renderPath: '/asset'
    }),

    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN
    }),

    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      validationSchema: envSchema
    }),

    // mailer module
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAILER_HOST'),
          port: 587,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAILER_PASSWORD')
          }
        },
        defaults: {
          from: configService.get('MAIL_FROM')
        },
        preview: true
      }),
      inject: [ConfigService]
    }),

    // redis
    // CacheModule.register({ store: redisStore, uri: process.env.REDIS_URL }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../'),
    //   renderPath: '/asset'
    // }),
    CacheModule.register({ store: redisStore, uri: process.env.REDIS_URL }),


    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, ContactUs, Faq, userPost, Comment, likeDislike, Place, Atv, GuidedTour],
        synchronize: true
      }),
      inject: [ConfigService]
    }),

    FaqsModule,

    ContactUsModule,

    PostModule,

    CommentModule,

    PlaceModule,

    AtvModule,

    GuidedToursModule,
  ],
  controllers: [],
  providers: [GoogleStrategy]
})
export class AppModule {}
