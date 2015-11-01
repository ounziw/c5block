<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/schema/table">
        <h2>controller.php</h2>
        <textarea rows="40" cols="100">&lt;?php
namespace Application\Block\<xsl:value-of select="substring(@name,3)" />;

use \Concrete\Core\Block\BlockController;
class Controller extends BlockController {

     protected $btInterfaceWidth = 400;
     protected $btInterfaceHeight = 400;
     protected $btTable = '<xsl:value-of select="@name" />';

    public function getBlockTypeDescription()
    {
        return t("");
    }

    public function getBlockTypeName()
    {
        return t("");
    }

    public function view()
    {
        <xsl:for-each select="field"><xsl:if test="@name!='bID'">
        $this->set('<xsl:value-of select="@name" />', $this-><xsl:value-of select="@name" />);</xsl:if></xsl:for-each>

    }

    public function save($data)
    {
        <xsl:for-each select="field"><xsl:if test="@name!='bID'">
        $args['<xsl:value-of select="@name" />'] = isset($data['<xsl:value-of select="@name" />']) ? trim($data['<xsl:value-of select="@name" />']) : '';</xsl:if></xsl:for-each>
        parent::save($args);

    }
}
        </textarea>
    </xsl:template>
</xsl:stylesheet>