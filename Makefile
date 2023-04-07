init_venv:
	python -m venv ./back/src/.venv
	./back/src/.venv/pip install -r ./back/requirements.txt
	cp ./back/.env.example ./back/src/.env

run_dev_uvicorn:
	@cd ./back/src  \
		&& ./.venv/bin/uvicorn --host 127.0.0.1 --port 8000 app:app --reload
	