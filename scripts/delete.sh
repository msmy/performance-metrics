#!/bin/bash
JOB=`echo "${JOB}" | tr - _`
HOST=${HOST:-'http://localhost:9091'}
URL_PATH="/metrics/job/perf_metrics_${JOB}/instance/metrics"
URL="$HOST$URL_PATH"

curl -v -X DELETE $URL
