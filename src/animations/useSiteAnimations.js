import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 全站动效系统（GSAP + ScrollTrigger）
 * 风格：高端创意机构 —— 遮罩揭开、大幅位移、压缩归位、卡片 stagger、图片 reveal / parallax
 * 缓动统一用 expo / power（丝滑不弹跳），全部 transform/opacity/clip-path（GPU，不卡）
 *
 * 注意：所有 `from` 一次性入场动画都加 `clearProps: 'transform'`，避免 tween 完成后
 * 残留 inline transform（曾导致按钮/卡片出现 36px 错位）。`fromTo` 滚动视差不加。
 */
export default function useSiteAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      /* ================= 首屏 Opening Animation ================= */
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // 导航栏先落位
      tl.from('.navbar', { y: -26, autoAlpha: 0, duration: 0.8, clearProps: 'transform' }, 0.1)
      // 背景视频开场缓入（Ken Burns）
        .from('.hero-video', { scale: 1.18, ease: 'power2.out', duration: 2.6, delay: 0.15, clearProps: 'transform' }, 0)
      // 徽章
        .from('.hero-badge', { y: 30, autoAlpha: 0, duration: 0.9, clearProps: 'transform' }, 0.4)
      // 大标题：遮罩从下揭开 + 大幅上移 + 压缩后归位
        .from('.hero-content > .warp-wrap', {
          clipPath: 'inset(0 0 100% 0)',
          y: '118%',
          scaleY: 0.42,
          transformOrigin: '50% 100%',
          duration: 1.6,
          ease: 'expo.inOut',
          clearProps: 'transform',
        }, 0.35)
      // 侧边装饰
        .from('.hero-sidebar', { x: -26, autoAlpha: 0, duration: 1, clearProps: 'transform' }, 0.55)
      // 副标题 / 简介 / 按钮 依次浮现
        .from('.hero-sub', { y: 46, autoAlpha: 0, duration: 1, clearProps: 'transform' }, 0.85)
        .from('.hero-desc', { y: 42, autoAlpha: 0, duration: 1, clearProps: 'transform' }, 1.0)
        .from('.hero-actions > *', { y: 38, autoAlpha: 0, stagger: 0.1, duration: 0.9, clearProps: 'transform' }, 1.15)
      // 底部信息 / 滚动提示
        .from('.hero-footer', { y: 26, autoAlpha: 0, duration: 0.9, clearProps: 'transform' }, 1.4)
        .from('.scroll-hint', { autoAlpha: 0, duration: 0.8 }, 1.55)

      // 滚动离开时，hero 视频轻微下沉（parallax）—— 滚动视差，不加 clearProps
      gsap.fromTo('.hero-video', { yPercent: 0 }, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      })

      /* ================= 模块标题（eyebrow 大标题先进场 + 中文标题跟上） ================= */
      gsap.utils.toArray('.section-head').forEach((head) => {
        const eyebrow = head.querySelector('.eyebrow')
        const title = head.querySelector('.warp-wrap')
        const st = { trigger: head, start: 'top 82%', once: true }

        if (eyebrow) {
          gsap.from(eyebrow, {
            x: -72,
            autoAlpha: 0,
            clipPath: 'inset(0 100% 0 0)',
            duration: 0.95,
            ease: 'expo.out',
            clearProps: 'transform',
            scrollTrigger: st,
          })
        }
        if (title) {
          gsap.from(title, {
            y: 84,
            autoAlpha: 0,
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.15,
            delay: 0.14,
            ease: 'expo.inOut',
            clearProps: 'transform',
            scrollTrigger: st,
          })
        }
      })

      /* ================= About ================= */
      gsap.from('.about-glow', {
        y: 90,
        autoAlpha: 0,
        duration: 1.15,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.about-glow', start: 'top 85%', once: true },
      })
      // 头像：遮罩揭开 + 上移
      gsap.from('.avatar', {
        clipPath: 'inset(0 0 100% 0)',
        y: 64,
        duration: 1.25,
        ease: 'expo.inOut',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.avatar', start: 'top 86%', once: true },
      })
      // 头像轻微 parallax（滚动跟随）—— 滚动视差，不加 clearProps
      gsap.fromTo('.avatar', { yPercent: -4 }, {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: '.avatar', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
      // 文案 + 数据行
      gsap.from('.about-text > p', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.about-text', start: 'top 88%', once: true },
      })
      gsap.from('.about-text .contact-row, .about-text .stats', {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.about-text .contact-row', start: 'top 90%', once: true },
      })

      /* ================= Projects：卡片 stagger + 图片 reveal + parallax ================= */
      gsap.utils.toArray('.project-card').forEach((card) => {
        const thumb = card.querySelector('.project-thumb')
        const cover = card.querySelector('.project-cover')

        if (thumb) {
          gsap.from(thumb, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.05,
            ease: 'expo.inOut',
            clearProps: 'transform',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
        }
        if (cover) {
          gsap.from(cover, {
            scale: 1.3,
            duration: 1.5,
            ease: 'expo.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
          // 滚动 parallax —— 滚动视差，不加 clearProps
          gsap.fromTo(cover, { scale: 1.12, yPercent: -5 }, {
            scale: 1.12,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: thumb, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
        }
      })
      // 卡片文字部分 stagger 进场
      gsap.from('.project-card .project-body', {
        y: 52,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%', once: true },
      })

      /* ================= Strengths：六卡 stagger ================= */
      gsap.from('.strengths-grid > *', {
        y: 74,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.05,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.strengths-grid', start: 'top 82%', once: true },
      })

      /* ================= Contact ================= */
      gsap.from('.contact h2', {
        clipPath: 'inset(0 0 100% 0)',
        y: 62,
        duration: 1.25,
        ease: 'expo.inOut',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.contact h2', start: 'top 85%', once: true },
      })
      gsap.from('.contact .sub', {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.contact .sub', start: 'top 90%', once: true },
      })
      gsap.from('.contact-actions > *', {
        y: 36,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.contact-actions', start: 'top 92%', once: true },
      })
      gsap.from('.footer-note', {
        autoAlpha: 0,
        duration: 1,
        delay: 0.3,
        clearProps: 'transform',
        scrollTrigger: { trigger: '.footer-note', start: 'top 95%', once: true },
      })

      ScrollTrigger.refresh()
    }, document.getElementById('root'))

    return () => ctx.revert()
  }, [])
}
