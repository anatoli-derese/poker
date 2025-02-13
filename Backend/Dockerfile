FROM python:3.11

ENV PYTHONUNBUFFERED=1
ENV POETRY_VERSION=2.0.1

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /app
COPY . .

COPY pyproject.toml  ./
RUN poetry lock

RUN poetry config virtualenvs.create false \
    && poetry install --no-root 

EXPOSE 8000

CMD ["poetry", "run" ,"uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
