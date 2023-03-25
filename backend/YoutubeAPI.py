from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter

# Must be a single transcript.
transcript = YouTubeTranscriptApi.get_transcript("fioZCWq_vy4")

formatter = TextFormatter() 

# .format_transcript(transcript) turns the transcript into a text string.
text_formatted = formatter.format_transcript(transcript)


# Now we can write it out to a file.
with open('your_filename.txt', 'w') as txt_file:
    txt_file.write(text_formatted)

# Now should have a new text file.
