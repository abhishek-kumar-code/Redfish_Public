# MakeJson.ps1 - PowerShell Script 
#
# Author: Jim Shelton
#
# This PowerShell Script will loop through all index.html files 
# in the Redfish Mockup directory and copy them to a subdirectory called
# json.  The index.html files will be renamed to include the name of 
# their path and an extension of .json

# NOTE: If you cannot run this powershell script, execute the
# following command in your powershell (GitShell) window (changes execution 
# policy) set-executionpolicy remotesigned

# Get all index.html files under the current Mockup directory
$files = Get-ChildItem -Path ./* -Include index.html -Recurse 

# Create a sub-directory to store the .JSON files (renamed index.html files)
mkdir json
cd json

# Loop through each index.html file in the Mockup
foreach ($file in $files) {
  
  # For each index.html file, create the appropriate JSON filename based on path
  $trimmedName = $file.FullName
  $trimmedName = $file.FullName.Substring( $file.FullName.IndexOf( "Mockup") + 7 );
  $trimmedName = $trimmedName -replace '\\','.'
  $trimmedName = $trimmedName.Replace( ".index.html", ".json" );
  $trimmedName = $trimmedName.Replace( "index.html", "Root.json" );
  
  # Copy the file to the json subdirectory with the new name
  # Write-Output "COPY " $file.FullName " to " $trimmedName
  Copy $file.FullName $trimmedName
  
  # Check  to see if the content of the file is valid JSON
  try {
    $text = Get-Content $trimmedName -Raw 

    $powershellRepresentation = ConvertFrom-Json $text;
    Write-Output "$trimmedName Ok" 
  } 
  catch {
    # There was an error parsing the JSON text from the file
    Write-Host "$trimmedName !!! Error converting to JSON !!!" -BackgroundColor "Red" -ForegroundColor "Black"
  } 
}
