// terminal cmd : npm i @google/generative-ai
"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI =  new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
// generting the content 
export async function generateBlogContent(title) {

    try {
        if (!title || title.trim().length === 0) { // trim() removes extra spaces from your sentence
            throw new Error("Title is required to generate content");
        }
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        const prompt = `
        Write a comprehensive blog post with the title: "${title}"

        Requirements:
        - Write engaging, informative content that matches the title
        - Use proper HTML formatting with headers (h2, h3), paragraphs, lists, and emphasis
        - Include 3-5 main sections with clear subheadings
        - Write in a conversational yet professional tone
        - Make it approximately 600-800 words
        - Include practical insights, examples, or actionable advice where relevant
        - Use <h2> for main sections and <h3> for subsections
        - Use <p> tags for paragraphs
        - Use <ul> and <li> for bullet points when appropriate
        - Use <strong> and <em> for emphasis
        - Ensure the content is original and valuable to readers

        Do not include the title in the content as it will be added separately.
        Start directly with the introduction paragraph.
        `;


        const result = await model.generateContent(prompt)
        const response = await result.response
        const content = response.text()

        // Basic validation
        if (!content || content.trim().length < 100) {
            throw new Error("Generated content is too short or empty");
        }
        return {
            success: true,
            content: content.trim(),
        };
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return {
            success: false,
            error: error.message || "Failed to generate content. Please try again.",
        };
    }
}
// improving the content 
export async function improveContent(currentContent, improvementType = "enhance") {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
        let prompt ;

        switch (improvementType) {
            case "expand":
                prompt = `
                Take this blog content and expand it with more details, examples, and insights:

                ${currentContent}

                Requirements:
                - Keep the existing structure and main points
                - Add more depth and detail to each section
                - Include practical examples and insights
                - Maintain the original tone and style
                - Return the improved content in the same HTML format
                `;
                break;

            case "simplify":
                prompt = `
                Take this blog content and make it more concise and easier to read:

                ${currentContent}

                Requirements:
                - Keep all main points but make them clearer
                - Remove unnecessary complexity
                - Use simpler language where possible
                - Maintain the HTML formatting
                - Keep the essential information
                - Make it approximately 200-250 words
                `;
                break;

            default: // enhance
                prompt = `
                Improve this blog content by making it more engaging and well-structured:

                ${currentContent}

                Requirements:
                - Improve the flow and readability
                - Add engaging transitions between sections
                - Enhance with better examples or explanations
                - Maintain the original HTML structure
                - Keep the same length approximately
                - Make it more compelling to read
                `;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedContent = response.text();

        return {
            success: true,
            content: improvedContent.trim(),
        };
         
    }catch (error) {
    console.error("Content improvement error:", error);
    return {
      success: false,
      error: error.message || "Failed to improve content. Please try again.",
    };
  }
}