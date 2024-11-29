# Stage 1: Fetching node base image
FROM node:18 AS base

# Specify working directory 
WORKDIR /app

# Copy dependency file
COPY package.json .

# Install dependencies
RUN npm install 


# Stage 2: Fetching node base image
FROM node:18 AS build

# Specify working directory 
WORKDIR /app

# Copy dependency code
COPY . .
COPY --from=base /app/node_modules/ ./node_modules/

# Create production build folder
RUN npm run build


# Stage 3: Using lightweight node image
FROM node:18-alpine

# Setup build argrument (Ex: docker build --build-arg BASEURL=<baseurl> .)
ARG BASEURL="http://backend:8000/api"

# Setup environment variables
ENV TIER=frontend \
    REACT_APP_BASE_URL=$BASEURL

# Maintainer of this dockerfile
MAINTAINER ujwal.pachghare

# Specify working directory 
WORKDIR /use/local/app/

# Copy production build directory from stage 2
COPY --from=build /app/build/ ./build/

# Copy dependencies from stage 1
COPY --from=base /app/node_modules/ ./node_modules/

# Copy application code
COPY . .

# Expose ports
EXPOSE 3000

# Run application 
CMD ["npm","start"]

