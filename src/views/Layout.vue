<template>
    <Layout class="layout-outer">
        <Sider collapsible 
        v-model="collapsed" 
        hide-trigger 
        breakpoint="lg" 
        :collapsed-width="60"
        :reverse-arrow="true">
            <i-amenu :collapsed="collapsed" :list="navList"><h1 v-show="!collapsed">logo</h1></i-amenu>
        </Sider>
        <Layout>
            <Header class="header-wrapper">
                <Icon type="md-menu" :size="32" @click.native="handleCollapsed" :class="triggerClasses"/>
            </Header>
            <Content class="content-con">
                <Card class="page-card">
                    <router-view/>
                </Card>
            </Content>
            <Footer class="footer-wrapper">
                <p>power by zong 2021</p>
            </Footer>
        </Layout>
    </Layout>
</template>
<script>
import iAmenu from '_c/iview-menu';
export default {
    components: {iAmenu},
    data () {
        return {
            collapsed: false,
            navList: [
                {
                    title: '1'
                },
                {
                    title: '2'
                },
                {
                    title: '3',
                    children: [
                        {
                            title: '3-1'
                        },
                        {
                            title: '3-2'
                        },
                        {
                            title: '3-3',
                            children: [
                                {
                                    title: '3-3-1'
                                },
                                {
                                    title: '3-3-2'
                                },
                                {
                                    title: '3-3-3',
                                    children: [
                                        {
                                            title: '3-3-3-1'
                                        },
                                        {
                                            title: '3-3-3-2'
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    title: '4'
                },
                {
                    title: '5'
                },
            ]
        }
    },
    computed: {
        triggerClasses () {
            return [
                'trigger-icon',
                this.collapsed ? 'rotate' : ''
            ]
        }
    },
    methods: {
        handleCollapsed () {
            this.collapsed = !this.collapsed;
        }
    }
}
</script>
<style lang="less" scoped>
.layout-outer {
    height: 100%;
    .header-wrapper {
        background: #fff;
        box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
        padding: 0 23px;
        .trigger-icon {
            cursor: pointer;
            &.rotate {
                transform: rotateZ(-90deg);
                transition: transform .3s ease;
            }
        }
    }
    .content-con {
        padding: 10px;
        .page-card {
            height: ~'calc(100vh - 64px - 20px - 48px - 21px)';
            overflow: hidden;
            overflow-y: auto;
        }
    }
    .footer-wrapper {
        background: #fff;
        box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .1);
    }
}
</style>