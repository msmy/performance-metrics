#!/bin/bash
DATA=`cat`
BRANCH=`git symbolic-ref --short -q HEAD | tr - _`
JOB=`echo ${PWD##*/} | tr - _`
HOST=${HOST:-'http://localhost:9091'}
URL_PATH="/metrics/jobs/perf_metrics_${JOB}_${BRANCH}/instances/metrics"
URL="$HOST$URL_PATH"

echo $URL
exit 0
echo "$DATA" | curl --data-binary @- "$URL"
