#!/bin/bash
DATA=`cat`
HOST=${HOST:-'http://localhost:9091'}
URL_PATH='/metrics/jobs/perf_metrics/instances/metrics'
URL="$HOST$URL_PATH"

echo "$DATA" | curl --data-binary @- "$URL"
