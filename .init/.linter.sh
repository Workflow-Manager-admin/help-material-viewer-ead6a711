#!/bin/bash
cd /home/kavia/workspace/code-generation/help-material-viewer-ead6a711/help_website_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

