module.exports = resolveContact=(doc, arg)=>{
    if(arg.whatsapp === ''){
        doc.whatsapp = []
    }else{
        doc.whatsapp = [...arg.whatsapp.split(',')]
    };

    if(arg.phone === ''){
        doc.phone = []
    }else{
        doc.phone = [...arg.phone.split(',')]
    };

    if(arg.facebook === ''){
        doc.facebook = []
    }else{
        doc.facebook = [...arg.facebook.split(',')]
    };

    if(arg.email === ''){
        doc.email = []
    }else{
        doc.email = [...arg.email.split(',')]
    };

    if(arg.twitter === ''){
        doc.twitter = []
    }else{
        doc.twitter = [...arg.twitter.split(',')];
    };

    if(arg.instagram === ''){
        doc.instagram = []
    }else{
        doc.instagram =[...arg.instagram.split(',')];
    };

    if(arg.websites === ''){
        doc.websites = []
    }else{
        doc.websites = [...arg.websites.split(',')];
    };

    if(arg.others === ''){
        doc.others = []
    }else{
        doc.others = [...arg.others.split(',')];
    }
}