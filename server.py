from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Modelo:
    def __init__(self, name):
        self.name = name



@app.get("/")
async def root():
    m1 = Modelo('consumo')
    return {
        "message": "Hello World",
        "traffic": [1200, 1900,4000],
        "earnings": [1200, 1090, 3000,5400,1220,3600,4800,4578,2566,8545,4587,9000],
        }

@app.get("/")
async def root():
    return {
        m1.name
        }




