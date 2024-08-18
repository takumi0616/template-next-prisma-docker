起動の手順

next ディレクトリで以下のコマンドを順次実行

- npm install
- npm run build
- docker compose up -d
- npm run migrate:init
- npm run postinstall
- npm run seed
- npm run dev

localhost:3000 にアクセス

- prisma studio 立ち上げ

  - npm run studio

- DB のリセット
  - npm run db:reset
