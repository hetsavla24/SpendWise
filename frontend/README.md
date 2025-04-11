# SpendWise Financial Dashboard Backend

A comprehensive Django REST API backend for the SpendWise personal finance management system.

## Features

- User Authentication with JWT
- Transaction Management
- Budget Planning and Tracking
- Financial Reports and Analytics
- Savings Goals
- Investment Tracking
- Financial Calendar
- User Settings and Profile Management

## Tech Stack

- Django 4.2+
- Django REST Framework
- PostgreSQL
- Redis (for caching and Celery)
- Celery (for async tasks)
- JWT Authentication

## Prerequisites

- Python 3.8+
- PostgreSQL
- Redis

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd spendwise
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create .env file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Setup the database:
```bash
python manage.py migrate
```

6. Create a superuser:
```bash
python manage.py createsuperuser
```

7. Run the development server:
```bash
python manage.py runserver
```

## API Documentation

Once the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/api/swagger/
- ReDoc: http://localhost:8000/api/redoc/

## Project Structure

```
spendwise/
├── accounts/          # User management
├── finances/          # Core financial functionality
├── budgets/           # Budget management
├── goals/            # Savings goals
├── investments/      # Investment tracking
├── calendar/         # Financial calendar
├── reports/          # Financial reporting
└── api/              # API configuration
```

## Environment Variables

Key environment variables required:
- `DEBUG`: Boolean for debug mode
- `SECRET_KEY`: Django secret key
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `DB_*`: Database configuration
- `JWT_*`: JWT settings
- `EMAIL_*`: Email settings
- `REDIS_URL`: Redis connection URL
- `CELERY_*`: Celery configuration

## Running Tests

```bash
python manage.py test
```

## API Endpoints

Base API endpoints:
- `/api/auth/` - Authentication endpoints
- `/api/dashboard/` - Dashboard summary data
- `/api/accounts/` - Financial accounts management
- `/api/transactions/` - Transaction management
- `/api/categories/` - Category management
- `/api/budgets/` - Budget planning and tracking
- `/api/reports/` - Financial reporting endpoints
- `/api/goals/` - Savings goals
- `/api/investments/` - Investment tracking
- `/api/calendar/` - Financial calendar
- `/api/users/` - User profile and settings

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
