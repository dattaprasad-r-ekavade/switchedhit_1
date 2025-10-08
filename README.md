# SwitchedHit

A Laravel application with Inertia.js and React frontend for managing switched hit baseball scenarios.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **PHP** 8.1 or higher
- **Composer** (PHP dependency manager)
- **Node.js** 18 or higher
- **npm** (comes with Node.js)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dattaprasad-r-ekavade/switchedhit_1.git
   cd switchedhit_1
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

4. **Environment Configuration:**
   ```bash
   cp .env.example .env
   ```

   The application is configured to use SQLite by default. If you need to change the database configuration, edit the `.env` file accordingly.

5. **Generate Application Key:**
   ```bash
   php artisan key:generate
   ```

6. **Run Database Migrations:**
   ```bash
   php artisan migrate
   ```

7. **Build Frontend Assets:**
   - For development (with hot reload):
     ```bash
     npm run dev
     ```
   - For production build:
     ```bash
     npm run build
     ```

## Running the Application

1. **Start the Laravel development server:**
   ```bash
   php artisan serve
   ```

2. **Access the application:**
   Open your browser and navigate to `http://localhost:8000`

## Development

### Available Scripts

- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build assets for production
- `npm run build:ssr` - Build assets with SSR support
- `npm run lint` - Run ESLint and fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run types` - Run TypeScript type checking

### Testing

Run the test suite with PHPUnit:
```bash
php artisan test
```

Or run specific test files:
```bash
vendor/bin/phpunit
```

### Code Quality

- **Linting:** `npm run lint`
- **Formatting:** `npm run format`
- **Type Checking:** `npm run types`

## Project Structure

- `app/` - Laravel application code (Controllers, Models, etc.)
- `resources/js/` - React frontend application
- `routes/` - Laravel routes
- `database/` - Migrations and seeders
- `tests/` - PHPUnit test files
- `config/` - Laravel configuration files

## Technologies Used

- **Backend:** Laravel 11, PHP 8.1+
- **Frontend:** React 18, TypeScript, Inertia.js
- **Build Tool:** Vite
- **Database:** SQLite (configurable)
- **Authentication:** Laravel Fortify
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI, Radix UI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.