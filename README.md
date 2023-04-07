# Template Project

This is example of web application based on FastAPI, Vue.js, PostgreSQL, Nginx, Docker.


## For development

### Venv

if you want to develop local, you should to create virtual environments for Pyton, install dependencies from `./back/requirements.txt` and create `.env` file in `./back/src/`. You can do it with `Makefile`-command

```bash
make init_venv
```

After initializing venv run project with

```bash
make run_dev_uvicorn
```

### Pre-Commit

Project has `.pre-commit-config.yaml` with settings for checking python code.
After installing it will check all changed files in git index on commit.

For install pre-commit execute:

```bash
pip install pre-commit
pre-commit install
```

For make commit without hooks (not recommend) use command with `-n` param:

```bash
git commit -m "Some important commit without pre-commit running" -n
```
