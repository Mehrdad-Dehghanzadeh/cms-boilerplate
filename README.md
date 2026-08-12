# CMS Boilerplate

یک API ماژولار برای شروع پروژه‌های CMS بر پایه NestJS، TypeORM و PostgreSQL.

## قابلیت‌های فعلی

- NestJS 11 و TypeScript
- اتصال PostgreSQL با TypeORM
- migration به‌جای `synchronize`
- اعتبارسنجی متغیرهای محیطی هنگام startup
- لاگ ساختاریافته و چرخش روزانه فایل‌های log
- محدودیت سراسری ۳۰ درخواست در هر ۶۰ ثانیه
- CRUD کامل دسته‌بندی‌ها
- تست واحد و e2e

## پیش‌نیازها

- Node.js 22 یا جدیدتر
- npm 8 یا جدیدتر
- PostgreSQL

## راه‌اندازی

```bash
npm ci
cp sample.env .env
```

مقادیر `.env`، به‌خصوص رمز دیتابیس، را متناسب با محیط خود تغییر دهید.

برای ایجاد کاربر و دیتابیس می‌توانید فایل زیر را با یک کاربر مدیر PostgreSQL اجرا کنید:

```bash
psql -U postgres -f database-query.sql
```

سپس ساختار دیتابیس را ایجاد کنید:

```bash
npm run migration:run
```

اجرای محیط توسعه:

```bash
npm run start:dev
```

برنامه به‌صورت پیش‌فرض روی پورت مشخص‌شده در `.env` اجرا می‌شود.

## متغیرهای محیطی

| متغیر | توضیح | نمونه |
| --- | --- | --- |
| `NODE_ENV` | یکی از `development`، `test` یا `production` | `development` |
| `PORT` | پورت HTTP برنامه | `1010` |
| `DB_TYPE` | نوع دیتابیس؛ فعلاً فقط PostgreSQL | `postgres` |
| `DB_HOST` | میزبان دیتابیس | `localhost` |
| `DB_PORT` | پورت دیتابیس | `5432` |
| `DB_USERNAME` | نام کاربری دیتابیس | `cms_user` |
| `DB_PASSWORD` | رمز قوی و غیرقابل‌اشتراک | — |
| `DB_NAME` | نام دیتابیس | `cms` |

برنامه در صورت نبودن یا نامعتبر بودن هر یک از مقادیر ضروری متوقف می‌شود.

## API دسته‌بندی‌ها

| متد | مسیر | توضیح |
| --- | --- | --- |
| `POST` | `/categories` | ایجاد دسته‌بندی |
| `GET` | `/categories` | دریافت همه دسته‌بندی‌ها |
| `GET` | `/categories/:id` | دریافت یک دسته‌بندی |
| `PATCH` | `/categories/:id` | ویرایش دسته‌بندی |
| `DELETE` | `/categories/:id` | حذف دسته‌بندی |

نمونه body:

```json
{
  "name": "News",
  "slot": "top-news",
  "isActive": true
}
```

مقدار `slot` فقط می‌تواند شامل حروف کوچک انگلیسی، عدد و خط تیره باشد. `name` و
`slot` در دیتابیس یکتا هستند.

## migration

```bash
# اجرای migrationهای اجرا‌نشده
npm run migration:run

# بازگرداندن آخرین migration
npm run migration:revert

# ایجاد migration خالی
npm run migration:create -- src/infrastructure/database/migrations/migration-name

# تولید migration از تغییر entityها
npm run migration:generate -- src/infrastructure/database/migrations/migration-name
```

گزینه TypeORM `synchronize` در همه محیط‌ها غیرفعال است. تغییر schema در production
باید فقط از طریق migration انجام شود.

## کنترل کیفیت

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
npm run test:e2e
npm run build
```

برای اصلاح خودکار lint و فرمت:

```bash
npm run lint:fix
npm run format
```

## production

```bash
npm ci
npm run build
npm run migration:run
NODE_ENV=production npm run start:prod
```

پوشه `logs` هنگام اجرا ایجاد می‌شود و در Git ثبت نخواهد شد.

## مجوز

[MIT](LICENSE)
