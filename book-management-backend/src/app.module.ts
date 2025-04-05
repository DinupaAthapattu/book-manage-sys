// // // import { Module } from '@nestjs/common';
// // // import { AppController } from './app.controller';
// // // import { AppService } from './app.service';
// // // import { MongooseModule } from '@nestjs/mongoose';

// // // @Module({
// // //   imports: [
// // //     MongooseModule.forRoot('mongodb:mongodb+srv://dinupa:dinupa123@cluster0.w10l9z4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), // Replace with Atlas URL if using cloud
// // //   ],
// // //   controllers: [AppController],
// // //   providers: [AppService],
// // // })
// // // export class AppModule {}

// // import { Module } from '@nestjs/common';
// // import { AppController } from './app.controller';
// // import { AppService } from './app.service';
// // import { MongooseModule } from '@nestjs/mongoose';
// // import { GraphQLModule } from '@nestjs/graphql';
// // import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// // import { join } from 'path';
// // import { UsersModule } from './users/users.module';
// // import { AuthModule } from './auth/auth.module';

// // @Module({
// //   imports: [
// //     MongooseModule.forRoot('mongodb:mongodb+srv://dinupa:dinupa123@cluster0.w10l9z4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
// //     GraphQLModule.forRoot<ApolloDriverConfig>({
// //       driver: ApolloDriver,
// //       autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Auto-generates schema
// //       sortSchema: true,
// //       playground: true, // Enables GraphQL Playground for testing
// //     }),
// //     UsersModule,
// //     AuthModule,
// //   ],
// //   controllers: [AppController],
// //   providers: [AppService],
// // })
// // export class AppModule {}

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { BooksModule } from './books/books.module';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb+srv://dinupa:dinupa123@cluster0.w10l9z4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
//       sortSchema: true,
//       playground: true,
//     }),
//     UsersModule,
//     AuthModule,
//     BooksModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dinupa:dinupa123@cluster0.w10l9z4.mongodb.net/book-management-system?retryWrites=true&w=majority&appName=Cluster0'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    UsersModule,
    AuthModule,
    BooksModule, // Add this line
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}