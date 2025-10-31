// this file basically is building the waiter i.e telling him what to do when he get the order from customer
// in short he will receive the order(i.e request) then giv that order to the kitchen(Imagekit) abd tke the final order(resonse) and give back to the customer(browser)

// npm install @imagekit/next
// npm i imagekit

// | Step | What happens                                  |
// | ---- | --------------------------------------------- |
// | 1    | User uploads a file                           |
// | 2    | Code checks if the user is logged in          |
// | 3    | File is read and converted to buffer          |
// | 4    | Unique name is created                        |
// | 5    | Image is uploaded to ImageKit                 |
// | 6    | Server replies with the image URL or an error |


import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { auth } from "@clerk/nextjs/server";

// connecting the imagekit to your website 
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

export async function POST(request) {  // when waiter get the order(i.e request)
    try {
        // checj wnether the user is aauthenticated before uplloading the file on imagekit n
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        // the file is POSTED to server in formdata format hence: 
        const formData = await request.formData();
        // FormData {
        //    "file" => File object,
        //    "fileName" => "myphoto.png"
        // }
        const file = formData.get("file");
        const fileName = formData.get("fileName");

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // now we have to convert the file into buffer format (like <Buffer 89 50 4e 47 0d 0a 1a 0a ...> because:
        // When you see a file like myphoto.png, that’s just a name for something on your computer.The file itself is just a bunch of numbers (bytes) stored in memory.So, sending the file object directly doesn’t make sense to Node.js or ImageKit — they need the raw data.

        // Convert file to buffer

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // now we have to generate a unique file name to avoid the ovwrridig of same file name 
        const timestamp = Date.now();
        const sanitizedFileName =
            fileName?.replace(/[^a-zA-Z0-9.-]/g, "_") || "upload";
        //[^a-zA-Z0-9.-] → anything that is not a letter, number, dot (.), or dash (-)
        // g → replace all occurrences
        // Example: "my photo@123.png" → "my_photo_123.png"
        const uniqueFileName = `${userId}/${timestamp}_${sanitizedFileName}`;
        // unqueFileName: abc123/1698412345678_my_photo_123.png


        // Upload to ImageKit - Simple server-side upload
        // finally upload the file to the imagekit in "blog_images" folder
        const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName: uniqueFileName,
            folder: "/blog_images",
        });

        // and return the response to the browser again with the following provided field 
        return NextResponse.json({
            success: true,
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
            width: uploadResponse.width,
            height: uploadResponse.height,
            size: uploadResponse.size,
            name: uploadResponse.name,
        });
    } catch (error) {
        console.error("ImageKit upload error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to upload image",
                details: error.message,
            },
            { status: 500 }
        );
    }
}