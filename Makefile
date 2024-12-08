up:
	docker-compose up --build -d

down:
	docker-compose down

logs:
	docker-compose logs -f

shell:
	docker-compose exec hardhat bash

restart:
	make down
	make up
