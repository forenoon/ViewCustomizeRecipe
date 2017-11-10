/* ------ view-customizes:
 マイページへAtom(History)を追加
----------------------- */
$(function() {
    var span = $("div#content .other-formats a.csv").parent().clone(true);
    span.find("a.csv").remove();

    var aAtom = $("div#content .other-formats a.atom").clone();
    aAtom.text("Atom(History)");
    aAtom.attr("href", aAtom.attr("href").replace("/issues.atom", "/issues/changes.atom"));
    span.append(aAtom);

    $("div#content .other-formats a.atom").parent().after(span);
})