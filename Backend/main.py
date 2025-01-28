# from contextlib import asynccontextmanager
# from fastapi import FastAPI # type: ignore 

# from fastapi.middleware.cors import CORSMiddleware

# import uvicorn

# from constrants import SERVER_URL , PORT , ENV

# from apps.calculator.route import router as calculator_router

# @asynccontextmanager

# async def lifespan(app: FastAPI):
#     yield


# app = FastAPI(lifespan=lifespan)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allows all origins
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers
# )


# @app.get('/')

# async def health():
#     return {'message' : "Server is running Fine!"}


# app.include_router(calculator_router , prefix='/calculator' , tags=['calculator'])
# if __name__ == "__main__":
#     uvicorn.run("main:app", host=SERVER_URL, port=int(PORT), reload=(ENV == "dev"))










from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from constrants import SERVER_URL, PORT, ENV
from apps.calculator.route import router as calculator_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def health():
    return {"message": "Server is running Fine!!"}

app.include_router(
    calculator_router,
    prefix='/calculator',
    tags=['calculator']
)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=SERVER_URL,
        port=int(PORT),
        reload=(ENV == "dev")
    )