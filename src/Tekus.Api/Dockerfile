FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Tekus.Api/Tekus.Api.csproj", "src/Tekus.Api/"]
COPY ["src/Tekus.Application/Tekus.Application.csproj", "src/Tekus.Application/"]
COPY ["src/Tekus.Domain/Tekus.Domain.csproj", "src/Tekus.Domain/"]
COPY ["src/Tekus.Infrastructure/Tekus.Infrastructure.csproj", "src/Tekus.Infrastructure/"]
RUN dotnet restore "src/Tekus.Api/Tekus.Api.csproj"
COPY . .
WORKDIR "/src/src/Tekus.Api"
RUN dotnet build "./Tekus.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Tekus.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tekus.Api.dll"]
