



let str = `How COVID-19 Spreads
Facebook Twitter LinkedIn Syndicate
COVID-19 is thought to spread mainly through close contact from person to person, including between people who are physically near each other (within about 6 feet). People who are infected but do not show symptoms can also spread the virus to others. We are still learning about how the virus spreads and the severity of illness it causes.

COVID-19 spreads very easily from person to person
How easily a virus spreads from person to person can vary. The virus that causes COVID-19 appears to spread more efficiently than influenza but not as efficiently as measles, which is among the most contagious viruses known to affect people.

COVID-19 most commonly spreads during close contact
People who are physically near (within 6 feet) a person with COVID-19 or have direct contact with that person are at greatest risk of infection.
When people with COVID-19 cough, sneeze, sing, talk, or breathe they produce respiratory droplets. These droplets can range in size from larger droplets (some of which are visible) to smaller droplets. Small droplets can also form particles when they dry very quickly in the airstream.
Infections occur mainly through exposure to respiratory droplets when a person is in close contact with someone who has COVID-19.
Respiratory droplets cause infection when they are inhaled or deposited on mucous membranes, such as those that line the inside of the nose and mouth.
As the respiratory droplets travel further from the person with COVID-19, the concentration of these droplets decreases. Larger droplets fall out of the air due to gravity. Smaller droplets and particles spread apart in the air.
With passing time, the amount of infectious virus in respiratory droplets also decreases.
COVID-19 can sometimes be spread by airborne transmission
Some infections can be spread by exposure to virus in small droplets and particles that can linger in the air for minutes to hours. These viruses may be able to infect people who are further than 6 feet away from the person who is infected or after that person has left the space.
This kind of spread is referred to as airborne transmission and is an important way that infections like tuberculosis, measles, and chicken pox are spread.
There is evidence that under certain conditions, people with COVID-19 seem to have infected others who were more than 6 feet away. These transmissions occurred within enclosed spaces that had inadequate ventilation. Sometimes the infected person was breathing heavily, for example while singing or exercising.
Under these circumstances, scientists believe that the amount of infectious smaller droplet and particles produced by the people with COVID-19 became concentrated enough to spread the virus to other people. The people who were infected were in the same space during the same time or shortly after the person with COVID-19 had left.
Available data indicate that it is much more common for the virus that causes COVID-19 to spread through close contact with a person who has COVID-19 than through airborne transmission. [1]
COVID-19 spreads less commonly through contact with contaminated surfaces
Respiratory droplets can also land on surfaces and objects. It is possible that a person could get COVID-19 by touching a surface or object that has the virus on it and then touching their own mouth, nose, or eyes.
Spread from touching surfaces is not thought to be a common way that COVID-19 spreads
COVID-19 rarely spreads between people and animals
It appears that the virus that causes COVID-19 can spread from people to animals in some situations. CDC is aware of a small number of pets worldwide, including cats and dogs, reported to be infected with the virus that causes COVID-19, mostly after close contact with people with COVID-19. Learn what you should do if you have pets.
At this time, the risk of COVID-19 spreading from animals to people is considered to be low. Learn about COVID-19 and pets and other animals.
Protect yourself and others
The best way to prevent illness is to avoid being exposed to this virus. You can take steps to slow the spread.

Stay at least 6 feet away from others, whenever possible. This is very important in preventing the spread of COVID-19.
Cover your mouth and nose with a mask when around others. This helps reduce the risk of spread both by close contact and by airborne transmission.
Wash your hands often with soap and water. If soap and water are not available, use a hand sanitizer that contains at least 60% alcohol.
Avoid crowded indoor spaces and ensure indoor spaces are properly ventilated by bringing in outdoor air as much as possible. In general, being outdoors and in spaces with good ventilation reduces the risk of exposure to infectious respiratory droplets.
Stay home and isolate from others when sick.
Routinely clean and disinfect frequently touched surfaces.
Pandemics can be stressful, especially when you are staying away from others. During this time, it’s important to maintain social connections and care for your mental health.

Learn more about what you can do to protect yourself and others.`

let common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

let word_count = {};

let words = str.split(/[ \n'\-\(\)\*":;\[\]|{},.!?]+/);
if (words.length == 1) {
    word_count[words[0]] = 1;
} else {
    words.forEach(function (word) {
        var word = word.toLowerCase();
        if (word != "" && common.indexOf(word) == -1 && word.length > 1) {
            if (word_count[word]) {
                word_count[word]++;
            } else {
                word_count[word] = 1;
            }
        }
    })
}

console.log(word_count)