from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import health, leads

app = FastAPI(
    title="Impacto API",
    version="0.1.0",
    description="API para la plataforma de impacto."
)

origins = ["http://localhost:3000","*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(leads.router, prefix="/api/v1")
