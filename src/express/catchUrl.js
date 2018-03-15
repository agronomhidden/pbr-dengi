import PaymentsUrlRewriter from "../Services/Riwriter/PaymentsUrlRewriter"

export default function catchUrl(req, res, next) {
    console.log('here');
    const rewriter = new PaymentsUrlRewriter(req._parsedUrl.path, '^\/payments\/pay\\?id=(\\d{11})&(default.+)')
    if (rewriter.find()) {
        res.redirect(rewriter.newString())
    } else {
        next()
    }
}