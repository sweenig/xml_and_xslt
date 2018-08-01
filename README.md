Not too long ago I was tasked with doing a health check for one of our customers. They used one of the products I was less familiar with, so I decided to look at some previous examples of health check reports and see what information I would need to gather and put in the report. It turns out one of my co-workers had already built a script that gathered some of the necessary information. At my request, he modified the output to XML so that I could then take that XML and use and XSLT (eXtensible Stylesheet Language Transformation) to convert it into a nice pretty report in a browser.<br />
<img border="0" height="172" src="https://3.bp.blogspot.com/-ARlRjGWdshI/UzL-Em-A3NI/AAAAAAAACy8/GtlsJxWYex0/s1600/lemmesplain.gif" width="320" />
Stored data is really comprised of two parts: the data itself and the schema. The schema is the format or syntax of the stored data. For example, let's say I wanted to store my CD collection. For each CD, would probably store the name of the CD, the artist, what country it was released from, the record label, the price I paid, and the year it was released. These descriptive details form the schema of the data I'm going to store. I could store the data in an Excel spreadsheet, with column headers and one row for each CD. That would be pretty easy, but what if the person I was sending the data to didn't have Excel? Plus, if I took one row out of the spreadsheet, I'd also have to copy the column headers so that the person I was sending the one row to would know what each column means. Without the schema information, the data isn't as easy to understand. XML is a language that allows all my data to be transmitted along with complete schema information. Consider the XML for a CD collection:<br />
<iframe src="https://pastebin.com/embed_iframe.php?i=aijaA8EK" style="border: none; height: 200px; width: 100%;"></iframe>
See how each piece of data has surrounding tags that help identify what each piece of data means? See how things are nested within each other so that it's easy to see what data pertains to which objects (i.e. which Artist produced which CD)? That's the nice part about XML.<br />
<br />
Now, back to the health check. My co-worker had modified his script so that the output was in XML format. That meant that I could then take the XML and easily interpret the data. It also meant that I could build an XSLT which would apply styles, chrome, and extra text to the XML to make it much more readable. Here is what the output of the script looks like. This is the XML, that I want to take and turn into a readable nice report. Ideally, I'd like to turn this into a PDF.<br />
<iframe src="https://pastebin.com/embed_iframe.php?i=9eiKWbFj" style="border: none; height: 200px; width: 100%;"></iframe>
The way to transform this is to build an XSLT and reference that XSLT within the XML itself. See how line 1 has a link to a xsl stylesheet? That's the XSLT. When the XML is opened in a supported browser (IE works best surprisingly), the browser will go find the XSLT and perform the translation against the XML data.
<iframe src="https://pastebin.com/embed_iframe.php?i=xhcHymiR" style="border: none; height: 500px; width: 100%;"></iframe>
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="https://media-cache-ec0.pinimg.com/originals/df/4a/5d/df4a5d0003e25813ed18d2bc6d43da63.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="https://media-cache-ec0.pinimg.com/originals/df/4a/5d/df4a5d0003e25813ed18d2bc6d43da63.jpg" height="146" width="200" /></a></div>
Ok, that's not too bad, right? Ok, let's go through the magic one piece at a time. The first 6 lines are pretty standard XSLT. The good stuff starts online 7. In a way, the XSLT will be merged with the XML. Technically, the XSLT is inserted into the XML document, but it is almost easier to think about the XML being inserted into the XSLT (it's actually because of this that most people actually incorrectly say that XSLT is in HTML format thinking that it's the HTML that the XML gets inserted into, but I digress).<br />
So, line 7 starts an XSL template. The XSL template here essentially says to go to the tag in the XML called 'nimsoft' and insert some HTML. (By the way, whenever an XSLT is applied, the underlying XML is pretty much hidden except where the XSLT specifies that it should be displayed.) So lines 8-19 are pretty standard HTML document headers. In another post, I'll go into the details about the helptoggler and the editablecontent parts. They have more to do with HTML and Javascript than XML/XSLT.<br />
Line 20 is the first place where we're going to insert some of the XML data. The &lt;xsl:value-of select="reportinfo/company" /&gt; tag instructs the browser to display the value inside the company tag, which is under the reportinfo tag, which is under the nimsoft tag. In the final HTML, line 20 would look like this:<br />
<span class="sc2" style="color: #009900; font-family: &quot;consolas&quot; , &quot;menlo&quot; , &quot;monaco&quot; , &quot;lucida console&quot; , &quot;liberation mono&quot; , &quot;dejavu sans mono&quot; , &quot;bitstream vera sans mono&quot; , monospace , serif; font-size: 12px; line-height: 21px; white-space: nowrap;">&lt;<span class="kw2" style="color: black; font-weight: bold;">div</span>&nbsp;<span class="kw3" style="color: #000066;">id</span><span class="sy0" style="color: #66cc66;">=</span><span class="st0" style="color: red;">"company_name_content"</span>&gt;</span><span style="background-color: white; font-family: &quot;consolas&quot; , &quot;menlo&quot; , &quot;monaco&quot; , &quot;lucida console&quot; , &quot;liberation mono&quot; , &quot;dejavu sans mono&quot; , &quot;bitstream vera sans mono&quot; , monospace , serif; font-size: 12px; line-height: 21px; white-space: nowrap;">Health Check for&nbsp;Fake Company</span><span class="sc2" style="color: #009900; font-family: &quot;consolas&quot; , &quot;menlo&quot; , &quot;monaco&quot; , &quot;lucida console&quot; , &quot;liberation mono&quot; , &quot;dejavu sans mono&quot; , &quot;bitstream vera sans mono&quot; , monospace , serif; font-size: 12px; line-height: 21px; white-space: nowrap;">&lt;<span class="sy0" style="color: #66cc66;">/</span><span class="kw2" style="color: black; font-weight: bold;">div</span>&gt;</span><br />
Lines 21-88 are more standard HTML. This section of the report is displayed to help the author make some changes after the initial version is rendered. I'll discuss this in another post.<br />
<div>
Lines 89-96 make use of the xsl:value-of tag to pull in more XML data. This time, pulling from the nimsoft/reportinfo/authors tag (e.g. Mickey Mouse) and the nimsoft/reportinfo/reportdate tag (e.g. 06 Feb 2014).</div>
<div>
Lines 97-107 contain a simple legal notice, another standard HTML block. Remember, all the standard HTML is just inserted at the point of the last template match. So, we're still inserting onto the root of the XML.</div>
<div>
Lines 108-135 begins the first section of the actual report and is more standard HTML, with a couple xsl tags. The first is at line 130, which uses the xsl:if statement to check to see if there is a value at the nimsoft/reportinfo/recsummary tag. If there is something there, the xsl:value-of tag displays it. It also uses the disable-output-escaping attribute, which means that the XML can contain valid HTML. Line 131 uses the xsl:if again checking for the existence of the nimsoft/reportinfo/recsummary tag or if it's empty. If it doesn't exist or it's empty, some boiler plate HTML is inserted instead of what we would have expected from the XML. This is handy since it allows that tag to be optional in the XML.</div>
<div>
<br /></div>
<div>
Up to this point, I've been using something called XPath to reference particular tags within the XML. XPath is a specification that allows tags to be referenced using their path in the XML. So far, I've shown how the root template has worked. Within any of the xsl:value-of tags, the select attribute has used XPath to specify a particular tag. Since I've been working within the root template (nimsoft), that part of the path is implied.&nbsp;</div>
<div>
<br /></div>
<div>
From lines 136-169, I follow the same pattern already established: put some raw HTML on the page, insert some values from particular XML tags using XPath. This also applies to lines 177-367. It all uses the same basic concepts.</div>
<div>
<br /></div>
<div>
However, lines 170, 172, 174, &amp; 176 use the xsl:apply-templates tag. This xsl tag instructs the browser to move down to the specified node in the XML and loop through the children of that node. This is similar to calling a function from within a program.</div>
<div>
<br /></div>
<div>
Line 170 specifies to go to the NMS node. Since we're inside the nimsoft template, that means the browser will move to the nimsoft/NMS node and loop through the children. To see what the browser does, look at lines 368-394. These lines specify what to do whenever the xsl:apply-templates tag is used for any node called NMS.</div>
<div>
Particularly, this piece of the XSLT builds a table and inserts the values of the various children nodes of the NMS node (lines 369-383 &amp; 389-393). Lines 384-388 specify another xsl:apply-templates tag (disks/disk), which means the browser moves to that node and processes the children; see lines 422-427. This nested template outputs a single row for each disk under NMS/disks/. Once all the children are processed, the browser returns to the template that called the apply-templates tag.</div>
<div>
<br /></div>
<div>
Lines 172, 174, &amp; 176 use similar templates, which either call their own templates or existing templates. For example, both the NMS and UMP templates call the disks/disk template since the disks are stored in the same way as the parent.</div>
<div>
<br /></div>
<div>
And that's about it. By walking through the XSLT with the XML right beside it, you can see how the final result is made. Simply opening the XML in IE was enough to get the information to display. It is pretty trivial from there to generate a PDF version of the report.</div>
<div>
<br /></div>
<div>
Here's a snipped of what the final report looks like. If you're interested in playing around with it yourself, you can <a href="http://files.weenig.com/Example.zip">download the sample XML, XSLT, and the other auxiliary files here</a>. Next time, I'll talk about how I built the help section and the editable content.</div>
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="https://2.bp.blogspot.com/-XrqAhY6TRXs/UzMe5RRM0tI/AAAAAAAACzM/aRxt2w944iQ/s1600/Sample.PNG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="https://2.bp.blogspot.com/-XrqAhY6TRXs/UzMe5RRM0tI/AAAAAAAACzM/aRxt2w944iQ/s1600/Sample.PNG" /></a></div>
<div>
<br /></div>
<div>
<br /></div>
