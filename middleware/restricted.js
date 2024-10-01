 function restricted(req,res,next){
    console.log(req.headers);
    const uid = req.headers["authorization"];
    // If the token doesn't exist, deny access
    if (!uid) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Verify the token
    try {
        const token=uid.split("Bearer ")[1];
        const decoded = jwt.verify(token,"HULU");
        if(decoded){
            res.json({ message: 'Access granted', user: decoded.username });
            next();
        }
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
 }

module.exports=restricted;