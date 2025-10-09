# Commands

## Setup

1. Ensure Docker and Docker Compose are installed on your system.

2. Navigate to the project directory.

3. Run the following command to build and start the services:

   ```
   docker-compose up --build
   ```

   This will start the Laravel application, Nginx web server, Vite development server for assets, and Adminer for database access.

## Access

- **Application**: http://localhost:8000
- **Database Browser**: http://localhost:8080
  - Uses sqlite-web for easy SQLite database browsing
  - No authentication required

## Development Commands

- **Run migrations**:
  ```
  docker-compose exec app php artisan migrate
  ```

- **Run seeders**:
  ```
  docker-compose exec app php artisan db:seed
  ```

- **Access the app container shell**:
  ```
  docker-compose exec app bash
  ```

- **Rebuild assets** (if needed):
  ```
  docker-compose exec node npm run build
  ```

- **View logs**:
  ```
  docker-compose logs -f
  ```

## Stopping the Services

- To stop the services:
  ```
  docker-compose down
  ```

- To stop and remove volumes (including database data):
  ```
  docker-compose down -v
  ```

## Notes

- The SQLite database file is located at `./database/database.sqlite` and is accessible via sqlite-web at http://localhost:8080
- If the database file doesn't exist, you may need to run migrations first.
- For production, additional configuration may be needed (e.g., environment variables, SSL).